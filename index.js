'use strict'

var session = require('express-session')
var express = require('express')
var mongo = require('mongodb')
var bodyParser = require('body-parser') // bodyPerser: reads input from a form and puts that in object which is accessable through req.body
var argon2 = require('argon2')
var multer = require('multer')


require('dotenv').config()

// code: https://github.com/cmda-be/course-17-18/tree/master/examples/mongodb-server by Titus Wormer
var db = null
//store localhost:27017 from .env in url
var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT
//var url = 'mongodb://localhost:27017/'

mongo.MongoClient.connect(url, function (error, client) {
      if (error) {
          throw error
      }
      db = client.db(process.env.DB_NAME)
  })
//end

var upload = multer({dest: 'static/'})


express()
  .set('view engine', 'ejs')
  .set('views', 'views')
  .use(bodyParser.urlencoded({extended: true}))
  .use(express.static('static'))
  //SESSION
  .use(session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET
  }))
  .get('/logout', logout)
  .get('/matches', matches)
  .get('/inbox', inbox)
  .get('/profile', profile)
  .get('/', about)
  .get('/login', loadLogin)
  .post('/login', login)
  .get('/signUp', loadSignUp)
  .post('/signUp', upload.single('profilepicture'), signUp)
  .get('/:index', match)
  .delete('/:id', remove)


  .use(notFound)
  .listen(8000)

// code: https://github.com/cmda-be/course-17-18/tree/master/examples/mongodb-server by @wooorm
// used the setup of a function that takes data from the database with 'collection'/table called
// profile, puts that data in an array, and gives it to done()

// MATCHES
function matches(req, res, next) {
  db.collection('profile').find().toArray(done) //toArray() returns an array that contains all the documents from a cursor

  function done(error, data){
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

// MATCH
function match(req, res, next) {
  var id = req.params.index
  //console.log(id)
  var _id = new mongo.ObjectId(id) //WHY Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
  //console.log(_id)

  db.collection('profile').findOne(_id, done)

  function done(error, data){
    if (error) {
        next(error)
    } else if (id == _id) {
      console.log('match')
      //console.log(data)
      res.render('match.ejs', {
          data: data
      })
    }
  }
}

//LOGIN
function loadLogin(req, res, next) {
  res.render('login.ejs')
}

function login(req, res) {
  //console.log('yes baby')
  var email = req.body.email
  var password = req.body.password
  //console.log(email)
  //console.log(password)

  db.collection('profile').findOne({
      email: email
  }, done)

  function done(error, user) {
    //console.log(user)
    //console.log(user.password)
    if (error) {
        throw error
    } else if (user) {
      console.log("Username is fine")
      argon2.verify(user.password, password).then(onverify)
    } else {
      res.statusCode = 401 // Unauthorized
          //console.log("Username does not exist")
      res.write("Username does not exist")
      res.end()
    }

    function onverify(match) {
      console.log(match)
      if (match) {
        // console.log(match)
        // console.log(user)
        console.log(email)
        req.session.user = {
            email: user.email
        }
        res.redirect('/profile')
        console.log(session)
      } else {
        res.statusCode = 401 // Unauthorized
        res.write("incorrect password")
        res.end()
        console.log('incorrect password')
      }
    }
  }
}


// SIGN UP
function loadSignUp(req, res, next) {
  res.render('signUp.ejs')
}

function signUp(req, res, next) {
  console.log('signUp')

  var email = req.body.email
  var password = req.body.password

  db.collection('profile').findOne({
    email: email
  }, done)

  function done(error, user) {
    //console.log(user)
    //console.log(user.password)
    //console.log(password)
    if (error) {
        throw error
    } else if (user) {
      res.statusCode = 401 // Unauthorized
      //console.log("Username does not exist")
      res.write("Username does not exist") //?????????????????????????????
      res.end()
    } else {
      console.log("Username is fine")
      argon2.hash(req.body.password).then(onhash, next)
      console.log(password)
    }

    function onhash(hash) {
      db.collection('profile').insertOne({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
          name: req.body.name,
          age: req.body.age,
          place: req.body.place,
          dateIdea: req.body.dateIdea,
          category: req.body.category,
          sex: req.body.sex,
          lookingFor: req.body.lookingFor,
          profilepicture: req.file ? req.file.filename : null,
      }, oninsert)

      function oninsert(error, user) {
        if (error) {
            next(error)
        } else {
          console.log(user)
          req.session.user = {email: email}
          res.redirect('/profile')
        }
      }
    }
  }
}

// PROFILE
function profile(req, res, next) {
  var email = req.session.user
  // console.log(email)

  db.collection('profile').findOne({
    email: req.session.user.email
  }, done)



  function done(error, data) {
    if (error) {
      next(error)
    } else {
      console.log('profile')
          //console.log(data)
          //console.log(user)
      res.render('profile.ejs', {
          data: data,
          user: req.session.user
      })
    }
  }
}

// INBOX
function inbox(req, res, next) {
  console.log("inbox")
  res.render('inbox.ejs', {
      title: 'inbox'
  })
}

//ABOUT
function about(req, res, next) {
  console.log("about")
  res.render('about.ejs', {
      title: 'about'
  })
}

//LOGOUT
//bron: https://github.com/cmda-be/course-17-18/blob/master/examples/auth-server/index.js#L1
function logout(req, res, next) {
  req.session.destroy(function (error) {
    if (error) {
      next(error)
    } else {
      res.redirect('/')
    }
  })
}

//REMOVE
function remove(req, res, next) {
  var id = req.params.id
  var _id = new mongo.ObjectId(id)

  db.collection('profile').deleteOne(_id, done)

  function done(error) {
    if (error) {
        next(error)
    } else {
        res.json({
        status: 'ok'
      })
    }
  }
}

//NOT FOUND
function notFound(req, res, next) {
  res.write('404')
  res.end()
  console.log('404')
}
