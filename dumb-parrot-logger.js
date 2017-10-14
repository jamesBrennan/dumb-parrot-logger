const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const log = require('minilog')('dumb-parrot')
require('minilog').enable()

const LOG_LEVELS = [
  'debug',
  'info',
  'warn',
  'error'
]

function isValidLogLevel (value) {
  return LOG_LEVELS.some(level => level === value)
}

const defaults = {
  logger: log
}

function server ({logger} = defaults) {
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.get('/', function (req, res) {
    res.send('The parrot is listening')
  })

  app.post('/', function (req, res) {
    logger.debug(req.body)
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
    logger[logLevel](req.body)
    res.sendStatus(201)
  })

  return app.listen('2040', () => { logger.info('started') })
}

module.exports = server
