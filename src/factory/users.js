// @ts-check
import { faker } from '@faker-js/faker'
import UserDao from 'components/users/dao'
import '@types'

/**
 * Obtener un usuario fake
 * @returns {User}
 */
export const getUserFake = () => {
  return {
    nickname: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

export const getUserBill = () => {
  return {
    nickname: 'admin',
    email: 'alejo.ramos@prestamoscashsol.com.pe',
    password: '235411%'
  }
}

/**
 * Crear Usuarios fake en la bd
 * @param {number} totalDocuments - Total de usuarios a guardar en la bd
 */
const userFactory = async (totalDocuments) => {
  await UserDao.clearUsers()

  for (let index = 0; index < totalDocuments; index++) {
    const userFake = getUserFake()
    await UserDao.createUser(userFake)
  }
  await UserDao.createUser(getUserBill())
}

export default userFactory
