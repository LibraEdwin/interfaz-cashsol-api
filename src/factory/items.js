// @ts-check
import { faker } from '@faker-js/faker'
import ItemDao from 'components/items/dao'
import '@types'

/**
 * Obtener un rubro fake
 * @returns {Item}
 */
export const getItemFake = () => {
  return {
    name: faker.name.jobArea()
  }
}

/**
 * Crear Rubors fake en la bd
 * @param {number} totalDocuments - Total de rubros a guardar en la bd
 */
const itemFactory = async (totalDocuments) => {
  await ItemDao.deleteAllDocuments()

  for (let index = 0; index < totalDocuments; index++) {
    const itemFake = getItemFake()
    await ItemDao.registerItem(itemFake)
  }
}

export default itemFactory
