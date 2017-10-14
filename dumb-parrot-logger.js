const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

let log = require('minilog')('dumb-parrot')
require('minilog').enable()

const LOG_LEVELS = [
  'log',
  'debug',
  'info',
  'warn',
  'error'
]

function isValidLogLevel (value) {
  return LOG_LEVELS.some(level => level === value)
}

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  res.send('The parrot is listening')
})

app.post('/', function (req, res) {
  log.log(req.body)
  res.sendStatus(201)
})

app.post('/:logLevel', function (req, res) {
  let { logLevel } = req.params
  if (!isValidLogLevel(logLevel)) {
    res
      .status(400)
      .send(`"${logLevel}" is not a valid log level. Expected one of: [${LOG_LEVELS.join(',')}].`)
    return
  }
  log[logLevel](req.body)
  res.sendStatus(201)
})

const server = app.listen('2040', () => { log.info('started') })

module.exports = server
