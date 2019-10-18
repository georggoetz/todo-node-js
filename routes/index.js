var express = require('express')
var router = express.Router()
var db = require('../db')

var TITLE = 'Todo List'

router.get('/', function (req, res, next) {
  db.any('SELECT * FROM todos WHERE COALESCE(complete, FALSE)=FALSE ORDER BY created_on DESC')
    .then(function (todos) {
      res.render('index', { title: TITLE, todos: todos })
    })
    .catch(function (err) {
      res.render('error', { message: err.message, error: err })
    })
})

router.post('/create_todo', function (req, res, next) {
  var text = req.body.text
  if (text && text.trim().length > 0) {
    db.one('INSERT INTO todos(text) VALUES($1) RETURNING id', text)
      .then(function (id) {
        res.redirect('/')
      })
      .catch(function (err) {
        res.render('error', { message: err.message, error: err })
      })
  }
})

router.post('/complete_todo', function (req, res, next) {
  var id = req.body.id
  db.none('UPDATE todos SET complete = TRUE WHERE id = $1', id)
    .then(function () {
      res.redirect('/')
    })
    .catch(function (err) {
      res.render('error', { message: err.message, error: err })
    })
})

module.exports = router
