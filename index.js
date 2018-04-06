'use strict'

var express = require('express')
var mongo = require('mongodb')

require('dotenv').config


var db;
//var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT //store localhost:27017 from .env in url
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
    .get('/', all)
    .get('/inbox', inbox)
    .get('/profile', profile)
    .get('/:index', detail)
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


function all(req, res, next) {
  db.collection('profile').find().toArray(done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      console.log('matches')
      console.log(data)
      res.render('matches.ejs', {
        data: data
      })
    }
  }
}



function detail(req, res) {

    var id = req.params.index
    console.log(id)
    var length = data.length
    console.log(length)


    if (id < length) {
        res.statuscode = 200 // 200 OK
        res.render('matches-detail.ejs', {
            title: 'matches-in-detail',
            data: data
        })
    } else {
      res.statuscode = 404 // 404 Not Found
      // res.render('error.ejs', {
      //     title: '404',
      // })
      res.write("404 Not Found")
      res.end()
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
