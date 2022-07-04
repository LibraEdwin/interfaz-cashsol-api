const fs = require('fs')
const dotenv = require('dotenv')
const envConfig = dotenv.parse(fs.readFileSync('.env.test'))
for (const k in envConfig) {
  process.env[k] = envConfig[k]
}

const DATABASE = {
  MONGODB_URI: process.env.MONGODB_URI,
  MYSQL_URI: null
}

const LOGGER = ' '

module.exports = {
  DATABASE,
  LOGGER
}
