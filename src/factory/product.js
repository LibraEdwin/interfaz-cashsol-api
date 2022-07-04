import { faker } from '@faker-js/faker'
import '@types'
import { clearProduct, creatProduct } from 'components/product/dao'

/**
 * Obtener un usuario fake
 * @returns {Product}
 */
export const geProduct = (categoryId) => {
  return {
    name: faker.commerce.productName(),
    productCategoryID: categoryId
  }
}

/**
 * Crear Usuarios fake en la bd
 * @param {number} totalDocuments - Total de usuarios a guardar en la bd
 */
const productFactory = async (totalDocuments, totalCategories) => {
  await clearProduct()

  for (let index = 0; index < totalDocuments; index++) {
    const categoryId = faker.datatype.number({ min: 1, max: totalCategories })
    const productFake = geProduct(categoryId)
    await creatProduct(productFake)
  }
}

export default productFactory
