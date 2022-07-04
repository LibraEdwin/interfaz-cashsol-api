/**
 * @fileoverview Archivo de Configuración, conección a mongodb
 */
import mongoose from 'mongoose'
import config from 'config'
import chalk from 'chalk'

const { MONGODB_URI } = config.get('DATABASE')

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false
}

const connection = mongoose.connect(MONGODB_URI, options)

const connect = async () => {
  try {
    await connection
    console.info(chalk.yellow('[database]: ') + `MongoDB => Coneccion abierta en ${MONGODB_URI}`)
  } catch (e) {
    console.error(`🔥 [database]: ${chalk.red(`Oh!!! ocurrió un error con MongoDB razón: ${e}`)}`)
  }
}

const disconnect = async () => {
  try {
    await (await connection).disconnect()
    console.info(chalk.yellow('[database]: ') + 'MongoDB => Se cerro la coneccion')
  } catch (e) {
    console.error(`🔥 [database]: ${chalk.red(`Hubo un error al intentar cerrar la coneccion: ${e}`)}`)
  }
}

const dropDatabase = async () => {}

export default {
  connect,
  disconnect,
  dropDatabase
}
