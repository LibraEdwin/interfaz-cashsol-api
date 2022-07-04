// @ts-check
import loanTypeFactory from './loanType'
import productFactory from './product'
import productCategoryFactory from './productCategory'
import userFactory from './users'
import clientFactory from './clients'
import productDetailFactory from './productDetails'
import positionFactory from './position'
import documentTypeFactory from './documentType'
import itemFactory from './items'
import bankingEntityFactory from './bankingEntities'

export default async () => {
  const NUM_USERS = 10
  const NUM_CLIENTS = 100
  const NUM_PRODUCT = 35
  const NUM_LOANTYPE = 23
  const NUM_PRODUCTCATEGORY = 4
  const NUM_ITEMS = 4
  const NUM_BANKING_ENTITIES = 6
  const NUM_DOCUMENTTYPE = 10
  const NUM_POSITION = 10
  const NUM_PRODUCT_DETAILS = 28

  /**
   * -------------------------------------
   * Registrar usuarios fake
   * -------------------------------------
   */
  await userFactory(NUM_USERS)

  /**
   * -------------------------------------
   * Registrar rubros fake
   * -------------------------------------
   */
  // await itemFactory(NUM_ITEMS)

  /**
   * -------------------------------------
   * Registrar entidades bancarias fake
   * -------------------------------------
   */
  // await bankingEntityFactory(NUM_BANKING_ENTITIES)

  /**
   * -------------------------------------
   * Registrar clientes fake
   * -------------------------------------
   */
  await clientFactory(NUM_CLIENTS)

  /**
   * -------------------------------------
   * Registrar tipos de documentos fake
   * -------------------------------------
   */
  // await documentTypeFactory(NUM_DOCUMENTTYPE)

  /**
   * -------------------------------------
   * Registrar cargos fake
   * -------------------------------------
   */
  // await positionFactory(NUM_POSITION)

  /**
   * -------------------------------------
   * Registrar cargos fake
   * -------------------------------------
   */
  // await loanTypeFactory(NUM_LOANTYPE)

  /**
   * -------------------------------------
   * Registrar categories de productos fake
   * -------------------------------------
   */
  // await productCategoryFactory(NUM_PRODUCTCATEGORY)
  /**
   * -------------------------------------
   * Registrar productos fake
   * -------------------------------------
   */
  // await productFactory(NUM_PRODUCT, NUM_PRODUCTCATEGORY)

  /**
   * -------------------------------------
   * Registrar detalles de productos fake
   * -------------------------------------
   */
  await productDetailFactory(NUM_PRODUCT_DETAILS, NUM_PRODUCT, NUM_CLIENTS)
}
