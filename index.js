'use strict'

var express = require('express')
var mongo = require('mongodb')

require('dotenv').config


var db
console.log(db)
// var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT //store localhost:27017 from .env in url
var url = 'mongodb://localhost:27017/'


// code: https://github.com/cmda-be/course-17-18/tree/master/examples/mongodb-server by Titus Wormer
mongo.MongoClient.connect(url, function(err,client){
  if (err) {
    throw err
  }
  db = client.db('mydatingsite')
  console.log("YEAH LETZ GO")
})
  //end

express()
    .set('view engine', 'ejs')
    .set('views', 'views')
    .use(express.static('static'))
    .get('/', matches)
    .get('/inbox', inbox)
    .get('/profile', profile)
    .get('/:index', match)
    .listen(8000)


// function all(req, res, data) {
//   var database = db.collection('profile').find()
//   var data = database.toArray()
//   console.log('matches')
//   console.log(data)
//   res.render('matches.ejs', {
//           data: data
//         })
// }

// code: https://github.com/cmda-be/course-17-18/tree/master/examples/mongodb-server by @wooorm
// used the setup of a function that takes data from the database with 'collection'/table called
// profile, puts that data in an array, and gives it to done()

function matches(req, res, next) {
  db.collection('profile').find().toArray(done) //toArray() returns an array that contains all the documents from a cursor
  // var test = db.collection('profile').find('name').toArray(done)
  // console.log(test)

  function done(error, data) {
    if (error) {
      next(error)
    } else {
      console.log('matches')
      //console.log(data)
      res.render('matches.ejs', {
        data: data
      })
    }
  }
}

function match(req, res, next) {
    var id = req.params.index
    console.log(id)

    var _id = new mongo.ObjectId(id)
    console.log(_id)

    db.collection('profile').findOne(_id,done)

    // res.write( id  + '\n' + _id)
    // res.end()
    //
    function done (error, data) {
      if (error) {
        next (error)
      } else if (id == _id) {
        console.log('match')
        console.log(data)
        res.render('matches-detail.ejs', {
          data: data
        })
      }
    }
  }

function inbox(req, res) {
    console.log("inbox")
    res.render('inbox.ejs', {
        title: 'inbox',
        //data: data
    })
}

function profile(req, res) {
    console.log("profile")
    res.render('profile.ejs', {
        title: 'profile',
        //data: data
    })
}
