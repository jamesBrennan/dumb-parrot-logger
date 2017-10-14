/* eslint-env mocha */

const request = require('supertest')

describe('dumb parrot', () => {
  let server

  beforeEach(() => {
    server = require('./dumb-parrot-logger')
  })

  afterEach(() => {
    server.close()
  })

  it('responds to /', () => {
    request(server)
      .get('/')
      .expect(200, 'The parrot is listening')
  })

  it('accepts json body', () => {
    request(server)
      .post('/')
      .send({hello: 'world'})
      .set('accept', 'json')
      .expect(201)
  })
})
