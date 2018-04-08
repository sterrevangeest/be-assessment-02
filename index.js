'use strict'

var express = require('express')
var mongo = require('mongodb')
// bodyPerser: reads input from a form and puts that in object which is accessable through req.body
var bodyParser = require('body-parser')


require('dotenv').config

var db
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
    .use(bodyParser.urlencoded({extended: true}))
    .use(express.static('static'))
    .get('/', about)
    .get('/matches', matches)
    .get('/inbox', inbox)
    .get('/profile', profile)

    .get('/login', loadLogin)
    .post('/login', login)

    .get('/signUp', loadSignUp)
    .post('/signUp', signUp)


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
      res.render('match.ejs', {
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

function about(req, res) {
  console.log("about")
  res.render('about.ejs', {
      title: 'profile',
      //data: data
  })
}

function login(req, res) {
  console.log("login")
  res.render('login.ejs', {
      title: 'profile',
      //data: data
  })
}

function loadSignUp(req, res, next) {
  res.render('signUp.ejs')
}

function signUp(req, res, next) {
  console.log('signUp')

  db.collection('profile').insertOne({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    age: req.body.age,
    place: req.body.place,
    dateIdea: req.body.dateIdea,
    category: req.body.category,
    sex: req.body.sex,
    lookingFor: req.body.lookingFor
  }, done)


  function done (error, data){
    if (error) {
      next(error)
    } else {
      res.redirect('/' + data.insertedId) //AANPASSEEEENNNNNNNNNNN
    }
  }
}


function loadLogin(req, res, next) {
  res.render('login.ejs')
}

function login (req,res,next){

  console.log('yes baby')

  var email = req.body.email
  console.log(email)
  var password = req.body.password
  console.log(password)

  db.collection('profile').findOne({
  email: email
  }, done)

  function done (error, user, data){

    if (error) {
      console.log('error')
    } else if (user && user.password === password) {
      console.log('password is correct, login')

      res.redirect('/profile')

    } else {
      console.log ('FOUT')
    }

  }
}
