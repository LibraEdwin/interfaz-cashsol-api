import request from 'supertest'
import app from 'app'
import config from 'config'
import mongoose from 'mongoose'

const api = request(app)
const ENPOINT = '/api/v1/product-details'
const { MONGODB_URI } = config.get('DATABASE')

beforeEach((done) => {
  mongoose.connect(
    MONGODB_URI,
    { useNewUrlParser: true },
    () => done()
  )
})

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  })
})

describe('Endpoin', () => {
  test('validate date', () => {
    const date = new Date()
  })
})
