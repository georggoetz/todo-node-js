var pgp = require('pg-promise')()

var db = pgp({
  host: process.env.TODO_HOST || 'localhost',
  port: process.env.TODO_PORT || 5432,
  database: process.env.TODO_DB_NAME || 'todo-db',
  user: process.env.TODO_DB_USER || 'postgres',
  password: process.env.TODO_DB_PASS || 'Lexware12345'
})

module.exports = db
