'use strict'

var express = require('express')
var mongo = require('mongodb')

var db = null
var url = 'mongodb://' + process.env.DB_HOST + ':'

express()
    .set('view engine', 'ejs')
    .set('views', 'views')
    .use(express.static('static'))
    .get('/', all)
    .get('/inbox', inbox)
    .get('/profile', profile)
    .get('/:index', detail)
    .listen(8000)


function all(req, res) {
    console.log("hello")
    res.render('matches.ejs', {
        title: 'matches',
        data: data
    })
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
            data: data[id]
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
        data: data
    })
}

function profile(req, res) {
    console.log("profile")
    res.render('profile.ejs', {
        title: 'profile',
        data: data
    })
}
