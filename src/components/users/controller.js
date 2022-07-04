// @ts-check
import UserDao from './dao'
import * as UserService from './services'
import jwt from 'jsonwebtoken'
import config from 'config'
const JSWT = config.get('JSWT')

/**
 * List all users
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function index(req, res) {
  const allUsers = await UserDao.listUsers()
  // return all users
  res.respond({ data: allUsers })
}

/**
 * Get user by Id
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function getById(req, res) {
  const id = Number(req.params.id)

  // Buscar por id
  const getUser = await UserDao.getUser(id)

  // Validar si se encontro id de usuario
  if (!getUser) {
    return res.failNotFound({ errors: 'El usuario no se encuentra registrado' })
  }

  // Retornar user by id
  return res.respond({ data: getUser })
}

/**
 * Create a User
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function create(req, res) {
  const user = req.body
  const userCreated = await UserDao.createUser(user)
  // return user created
  return res.respondCreated({ data: userCreated })
}

/**
 * Update user
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function updateById(req, res) {
  // Params
  const id = Number(req.params.id)
  const user = req.body

  // Validation exist
  const validateUserExist = await UserDao.userExist(id)

  if (!validateUserExist) {
    return res.failNotFound({ errors: 'No existe datos para el usuario ingresado' })
  }

  // Update data user
  const userUpdated = await UserDao.updateuser(id, user)

  // Return user updated
  return res.respondUpdated({ data: userUpdated })
}

/**
 * Remove User by Id
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function removeById(req, res) {
  const id = Number(req.params.id)
  const deleteUser = await UserDao.deleteUser(id)

  if (!deleteUser) {
    return res.failNotFound({ errors: `Parece que el id ${id} que intenta eliminar no se encuentra registrado` })
  }
  return res.respondDeleted({ message: `El usuario ${id} se elimino satisfactoriamente` })
}

/**
 * Login User
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function loginUser (req, res) {
  // Params
  const { email, password } = req.user

  // Find exist user
  const userLogin = await UserDao.findUser(email)

  // Validate if not exist user
  if (!userLogin) {
    return res.failAuthentication({ errors: 'El correo ingresado no se encuentra registrado' })
  }
  // Validate if exist user
  const match = await UserService.comparePassword(userLogin.password, password)

  if (!match) {
    return res.failAuthentication({ errors: 'Los datos ingresados no son validos' })
  }

  // Create payload
  const payload = {
    user: {
      id: userLogin._id,
      nickname: userLogin.nickname,
      email: userLogin.email,
      password: userLogin.password
    }
  }

  // Generate token
  const token = jwt.sign(
    payload,
    JSWT.SESSION_SECRET,
    { expiresIn: JSWT.SESSION_EXPIRE_IN }
  )

  res.respond({ data: { user_token: token } })
}

/**
 * Logout User
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function logoutUser (req, res) {
  return res.cookie('user_token', '', {
    expires: new Date(0),
    path: '/'
  })
}
