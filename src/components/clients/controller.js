// @ts-check
import ClientDao from './dao'
import ClientDto from './dto'
import labels from './labels'
import { comparePassword } from 'helpers/utils'
import jwt from 'jsonwebtoken'
import config from 'config'
const JSWT = config.get('JSWT')

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
const index = async (req, res) => {
  try {
    const { limit, page, ...query } = req.query

    const clients = await ClientDao.findAll(Number(limit), Number(page), { ...query })
    const data = ClientDto.multiple(clients, query)
    return res.respond({ data })
  } catch (error) {
    return res.failServerError({ errors: [error.message] })
  }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
const getById = async (req, res) => {
  try {
    const { id } = req.params
    const clientFound = await ClientDao.findById(id)

    if (!clientFound) {
      return res.failNotFound({ errors: [labels.errors.response.notFound] })
    }

    const data = ClientDto.single(clientFound)

    return res.respond({ data })
  } catch (error) {
    return res.failServerError({ errors: [error.message] })
  }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
const getByDocumentNumber = async (req, res) => {
  try {
    const { number } = req.params
    const clientFound = await ClientDao.findByDocumentNumber(number)
    if (!clientFound) {
      return res.failNotFound({ errors: [labels.errors.response.notFound] })
    }
    const data = ClientDto.single(clientFound)
    return res.respond({ data })
  } catch (error) {
    return res.failServerError({ errors: [error.message] })
  }
}
/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
const create = async (req, res) => {
  try {
    const client = req.body
    const clientCreated = await ClientDao.createClient(client)
    const data = ClientDto.single(clientCreated)
    return res.respondCreated({ data })
  } catch (error) {
    console.log(error)
    return res.failServerError({ errors: [error.message] })
  }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
const updateById = async (req, res) => {
  try {
    const { id } = req.params
    const client = req.body
    const clientUpdated = await ClientDao.updateClient(id, client)
    if (!clientUpdated) {
      return res.failNotFound({ errors: [labels.errors.response.notFound] })
    }
    const data = ClientDto.single(clientUpdated)
    return res.respondUpdated({ data })
  } catch (error) {
    return res.failServerError({ errors: [error.message] })
  }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
const removeById = async (req, res) => {
  try {
    const { id } = req.params

    const isDeleted = await ClientDao.deleteClientById(id)

    if (!isDeleted) {
      return res.failNotFound({ errors: [labels.errors.response.notFound] })
    }

    return res.respondDeleted({ message: labels.success.response.deleted })
  } catch (error) {
    return res.failServerError({ errors: [error.message] })
  }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
const signIn = async (req, res) => {
  try {
    // Params
    const { email, password } = req.user

    // Find exist email
    const clientFound = await ClientDao.findClientByEmail(email)

    // Validate if not exist client
    if (!clientFound) {
      return res.failAuthentication({ errors: labels.errors.validation.signIn.emailNotFound })
    }
    // Validate password if exist client
    const match = await comparePassword(clientFound.password, password)

    if (!match) {
      return res.failAuthentication({ errors: labels.errors.validation.signIn.passwordNotMatch })
    }

    // Create payload
    const payload = {
      client: {
        id: clientFound._id,
        name: clientFound.nickname,
        email: clientFound.email
      }
    }

    // Generate token
    const token = jwt.sign(
      payload,
      JSWT.SESSION_SECRET,
      { expiresIn: JSWT.SESSION_EXPIRE_IN }
    )

    return res.respond({ data: { clientToken: token } })
  } catch (error) {
    return res.failServerError({ errors: [error.message] })
  }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
const signOut = async (req, res) => {
  try {
    return res.cookie('clientToken', '', {
      expires: new Date(0),
      path: '/'
    })
  } catch (error) {
    return res.failServerError({ errors: [error.message] })
  }
}

export default {
  index,
  getById,
  getByDocumentNumber,
  signIn,
  signOut,
  create,
  updateById,
  removeById
}
