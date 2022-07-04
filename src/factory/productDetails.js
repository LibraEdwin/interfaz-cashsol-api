import { faker } from '@faker-js/faker'
import ProductDetailDao from 'components/productDetails/dao'

export function getProductDetailFake({ product, client }) {
  return {
    product: product,
    client: client,
    appraisedValue: faker.datatype.float({ min: 10, max: 5000, precision: 0.01 }),
    productName: faker.commerce.productName(),
    year: faker.datatype.number({ min: 2010, max: 2022 }),
    brand: faker.company.bsBuzz(),
    model: faker.commerce.productAdjective(),
    serie: faker.commerce.productMaterial(),
    features: faker.commerce.productDescription(),
    observationIntExt: faker.commerce.productDescription(),
    observationOperation: faker.commerce.productDescription()
    // receptionDate: faker.date.past()
    // returnDate: faker.date.future()
  }
}

async function createListProductDetails(totalDocuments, totalProducts, totalClients) {
  // limpiar todos los detalles de productos ya generados
  await ProductDetailDao.clearDetailModel()

  for (let index = 0; index < totalDocuments; index++) {
    const product = faker.datatype.number({ min: 1, max: totalProducts })

    const client = faker.datatype.number({ min: 1, max: totalClients })

    const productDetailFake = getProductDetailFake({ product, client })
    // guardar en la base de datos
    await ProductDetailDao.create(productDetailFake)
  }
}

export default createListProductDetails
