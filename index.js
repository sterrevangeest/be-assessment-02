'use strict'

var express = require('express')

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


// data
var data = [
    {
        name: 'Luuk',
        age: '23 jaar',
        place: 'Amsteram',
        dateIdea: 'Cocktails drinken in Amsterdam, bij Tunes Bar en daarna zien we wel.',
        category: 'romantisch'
  },
    {
        name: 'Bram',
        age: '21 jaar',
        place: 'Haarlem',
        dateIdea: 'Wandeling op het strand bij Wijk aan Zee',
        category: 'romantisch'
  },
    {
        name: 'Koen',
        age: '25 jaar',
        place: 'Utrecht',
        dateIdea: 'Skydiven in Zoetermeer, daarna ergens iets drinken',
        category: 'avontuur'
  },
  {
      name: 'Joep',
      age: '24 jaar',
      place: 'Amsterdam',
      dateIdea: 'Ik weet een heel leuk restaurant in Amsterdam, het lijkt mij leuk je mee te nemen.',
      category: 'Romantisch'
}
]
