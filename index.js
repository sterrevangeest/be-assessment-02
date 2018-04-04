'use strict'

var express = require('express')

express()
  //.set('view engine', 'ejs')
  //.set('views', 'views')
  .use(express.static('static'))
  .get('/', all)
  //.get('/:index', get)
  .listen(8000)


var data = [
  {
    name: 'Daan',
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
  }
]





function all(req,res){
    console.log("hello")
    res.write('This a datingsite')
    res.end()

}
