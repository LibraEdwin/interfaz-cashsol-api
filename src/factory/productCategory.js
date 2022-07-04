import { faker } from '@faker-js/faker'
import '@types'
import { clearProductCategory, createProductCategory } from 'components/productCategory/dao'

/**
 * Obtener un usuario fake
 * @returns {Position}
 */
export const geProductCategory = () => {
  return {
    name: faker.commerce.productAdjective(),
    loanTypeID: 1,
    minInterest: 2,
    maxInterest: 3
  }
}

/**
 * Crear Usuarios fake en la bd
 * @param {number} totalDocuments - Total de usuarios a guardar en la bd
 */
const productCategoryFactory = async (totalDocuments) => {
  await clearProductCategory()

  for (let index = 0; index < totalDocuments; index++) {
    const productCategoryFake = geProductCategory()
    await createProductCategory(productCategoryFake)
  }
}

export default productCategoryFactory
