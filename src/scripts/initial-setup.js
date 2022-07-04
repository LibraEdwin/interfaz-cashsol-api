// @ts-check
import config from 'config'
import factory from 'factory'
import loadUbigeos from './load-ubigeos'
import loadProduc from './load-product'
import mongodb from 'backing/databases/mongodb'
import preloadData from './preload-data'

(async () => {
  // console.log(config)
  const isProduction = config.util.getEnv('NODE_CONFIG_ENV') === 'production'

  /**
   * -------------------------------------
   * Connectar con la BD
   * -------------------------------------
   */
  await mongodb.connect()

  /**
   * -------------------------------------
   * Load ubigeos
   * -------------------------------------
   */
  await loadUbigeos()
  /**
   * -------------------------------------
   * Load product
   * -------------------------------------
   */
  await loadProduc()

  /**
   * -------------------------------------
   * Load ubigeos
   * -------------------------------------
   */
  await preloadData()
  /**
   * -------------------------------------
   * Datos fake
   * -------------------------------------
   */
  if (!isProduction) {
    await factory()
  }

  /**
   * -------------------------------------
   * Desconectar con la BD
   * -------------------------------------
   */
  await mongodb.disconnect()
})()
