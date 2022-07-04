// @ts-check
import config from 'config'
import { Storage } from '@google-cloud/storage'

const { PATH_KEY, NAME } = config.get('BUCKET')

/**
 * Subir un archivo
 * @param {object} options
 * @param {string} options.fileName - Nombre final que tendrá el archivo a subir
 * @param {string} options.fileTmpPath - Ubicación del archivo en la carpeta temporal
 * @param {string} options.destFileName - Carpeta de desino final
 */
const uploadFile = async ({ fileName, fileTmpPath, destFileName }) => {
  // Creates a client
  const storage = new Storage()
  const destination = destFileName + '/' + fileName

  try {
    await storage
      .bucket(NAME)
      .upload(fileTmpPath, {
        destination,
        gzip: true
      })

    storage
      .bucket(NAME)
      .file(destination)
      .setMetadata({ cacheControl: 'no-cache' })
  } catch (e) {
    console.log('ERROR', e)
    throw new Error(e.name + ': ' + e.message)
  }
}

export default {
  uploadFile
}
