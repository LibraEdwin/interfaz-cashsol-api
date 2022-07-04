// @ts-check
import '@types'
import UserModel from './model'
import * as UserService from './services'

const findAll = async () => {
  return await UserModel.find()
}

/**
 * Obtener id correlativo
 * @returns {Promise<number>}
 */
const getIdCorrelative = async () => {
  const totalDocuments = await UserModel.countDocuments()
  return totalDocuments + 1
}

/**
 * Registrar un usuario
 * @param {import('./types').User} user - datos del usuario nuevo
 */
const createUser = async (user) => {
  const { nickname, email, password } = user

  const userCreated = await UserModel.create({
    _id: await getIdCorrelative(),
    nickname,
    email,
    password: await UserService.encryptPassword(password)
  })

  return userCreated
}

/* List Users */
const listUsers = async () => {
  return await UserModel.find({})
}

/**
 * Get a User by Id
 * @param {number} id
 *
 */
const getUser = async (id) => {
  return await UserModel.findOne({ _id: id })
}

/**
 * Update User
 * @param {number} id
 * @param {import('./types').User} user
 *
 * @returns {Promise<import('./types').User>}
 */
const updateuser = async (id, user) => {
  // Validate data to update
  const { nickname, email, password } = user

  const dataToUpdate = {}

  if (nickname) {
    dataToUpdate.nickname = nickname
  }
  if (email) {
    dataToUpdate.email = email
  }
  if (password) {
    dataToUpdate.password = await UserService.encryptPassword(password)
  }
  console.log(dataToUpdate, 'data')

  // Data to update
  const userUpdated = await UserModel.findByIdAndUpdate(
    { _id: id },
    dataToUpdate,
    {
      new: true,
      runValidation: true
    }
  )

  if (!userUpdated) {
    return null
  }
  return userUpdated
}

/* Delete User */
const deleteUser = async (id) => {
  const userDelete = await UserModel.deleteById(id)
  return userDelete.matchedCount
}

/* Find user for login */
const findUser = async (username) => {
  const foundUser = await UserModel.findOne({ email: username })

  if (!foundUser) {
    return null
  }

  return foundUser
}

const userExist = async (id) => {
  return await UserModel.exists({ _id: id })
}

const clearUsers = async () => {
  await UserModel.deleteMany()
}

export default {
  getIdCorrelative,
  createUser,
  listUsers,
  getUser,
  updateuser,
  userExist,
  deleteUser,
  findUser,
  clearUsers,
  findAll
}
