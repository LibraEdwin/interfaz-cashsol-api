// @ts-check
import { creatProduct, findAllProduct, removePosition, updateProduct, findProductsByCategory, findProductById } from './dao'
import { multiple, single } from './dto'
import labels from './labels'
/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export const index = async (req, res) => {
  const { limit, page, ...query } = req.query
  const products = await findAllProduct(Number(limit), Number(page), { ...query })
  const data = multiple(products, query)
  return res.respond({ data })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export const getById = async (req, res) => {
  const { id } = req.params
  const products = await findProductById(id)
  const data = single(products)
  return res.respond({ data })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export const getByCategory = async (req, res) => {
  try {
    const { limit, page, ...query } = req.query
    const { id } = req.params
    const products = await findProductsByCategory(id, Number(limit), Number(page), { ...query })
    const data = multiple(products, query)
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
export async function create(req, res) {
  const newProduct = req.body
  try {
    const productCreate = await creatProduct(newProduct)
    if (productCreate === 'null productCategoryID') {
      return res.respondUpdated({ data: productCreate, message: labels.errors.validationID.errors })
    }
    return res.respondCreated({ data: productCreate, message: labels.success.response.created })
  } catch (error) {
    return res.failServerError({ errors: error.message })
  }
}
/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function updateById(req, res) {
  const { id } = req.params
  const dataProduct = req.body
  try {
    const productUpdate = await updateProduct(id, dataProduct)
    if (productUpdate === 'null productCategoryID') {
      return res.respondUpdated({ data: productUpdate, message: labels.errors.validationID.errors })
    }
    return res.respondUpdated({ data: productUpdate, message: labels.success.response.updated })
  } catch (error) {
    return res.failServerError({ errors: error.message })
  }
}
/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function removeById(req, res) {
  const { id } = req.params
  const productDeleted = await removePosition(id)
  if (!productDeleted) {
    return res.failNotFound({ errors: labels.errors.removeById.errors })
  }
  return res.respondDeleted({ message: labels.success.response.deleted })
}
