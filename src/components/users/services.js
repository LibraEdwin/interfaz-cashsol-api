// @ts-check
import bcrypt from 'bcrypt'

export function validation () {
  throw new Error('Error en la basse')
}

/**
 * Función para cifrar password
 * @param {string} password
 * @returns {Promise<string>}
 */
export async function encryptPassword (password) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

/**
 * Compare passwords
 * @param {string} password
 * @param {string} passwordReceived
 * @returns {Promise<boolean>}
 */
export async function comparePassword (password, passwordReceived) {
  return await bcrypt.compare(passwordReceived, password)
}
