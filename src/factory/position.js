import { faker } from '@faker-js/faker'
import '@types'
import { clearPosition, createPosition } from 'components/position/dao'

/**
 * Obtener un usuario fake
 * @returns {Position}
 */
export const gePosition = () => {
  return {
    name: faker.name.findName()
  }
}

/**
 * Crear Usuarios fake en la bd
 * @param {number} totalDocuments - Total de usuarios a guardar en la bd
 */
const positionFactory = async (totalDocuments) => {
  await clearPosition()

  for (let index = 0; index < totalDocuments; index++) {
    const userFake = gePosition()
    await createPosition(userFake)
  }
}

export default positionFactory
