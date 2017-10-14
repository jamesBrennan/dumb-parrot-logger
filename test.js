/* eslint-env mocha */

const request = require('supertest')
const sinon = require('sinon')
const logger = require('minilog')('test-logger')

describe('dumb parrot', () => {
  let server, body

  beforeEach(() => {
    body = {hello: 'world'}
    server = require('./dumb-parrot-logger')({logger})
    require('minilog').disable()
  })

  afterEach(() => {
    server.close()
    require('minilog').enable()
  })

  it('accepts GET /', (done) => {
    request(server)
    .get('/')
    .expect(200, 'The parrot is listening')
    .end(done)
  })

  it('accepts POST /', (done) => {
    post('/')(server).expect(201, done)
  })

  describe('log level paths', () => {
    it('defaults to "debug"', () => {
      sinon.spy(logger, 'debug')

      return post('/', body)(server)
      .expect(201)
      .then(() => {
        sinon.assert.calledWith(logger.debug, body)
        logger.debug.restore()
      })
    })

    it('matches POST /debug', () => {
      sinon.spy(logger, 'debug')

      return post('/debug', body)(server)
      .expect(201)
      .then(() => {
        sinon.assert.calledWith(logger.debug, body)
        logger.debug.restore()
      })
    })

    it('matches POST /info', () => {
      sinon.spy(logger, 'info')

      return post('/info', body)(server)
      .expect(201)
      .then(() => {
        sinon.assert.calledWith(logger.info, body)
        logger.info.restore()
      })
    })

    it('matches POST /warn', () => {
      sinon.spy(logger, 'warn')

      return post('/warn', body)(server)
      .expect(201)
      .then(() => {
        sinon.assert.calledWith(logger.warn, body)
        logger.warn.restore()
      })
    })

    it('matches POST /error', () => {
      sinon.spy(logger, 'error')

      return post('/error', body)(server)
      .expect(201)
      .then(() => {
        sinon.assert.calledWith(logger.error, body)
        logger.error.restore()
      })
    })
  })

  describe('response to POST /:invalid_log_level', () => {
    it('is 400 - BAD_REQUEST', () => {
      return post('/urgent', body)(server).expect(400)
    })
  })
})

function post (path = '/', body = {}) {
  return (server) => {
    return request(server).post(path).send(body).set('accept', 'json')
  }
}
