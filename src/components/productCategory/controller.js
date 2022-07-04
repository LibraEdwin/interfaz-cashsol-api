// @ts-check
import { createProductCategory, findAllProductCategory, removePosition, updatePosition } from './dao'
import { multiple } from './dto'
import labels from './labels'
/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export const index = async (req, res) => {
  const { limit, page, ...query } = req.query
  const productCategory = await findAllProductCategory(Number(limit), Number(page), { ...query })
  const data = multiple(productCategory, query)
  return res.respond({ data })
}
/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function create(req, res) {
  const newProductCategory = req.body
  try {
    const positionCreate = await createProductCategory(newProductCategory)
    if (positionCreate === 'error Interest') {
      return res.respondUpdated({ data: positionCreate, message: labels.errors.validationID.errorsInterest })
    }
    if (positionCreate === 'null LoanTypeID') {
      return res.respondUpdated({ message: labels.errors.validationID.errorsLoanTypeID + ' ' + positionCreate })
    }
    return res.respondCreated({ data: positionCreate, message: labels.success.response.created })
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
  const dataProductCategory = req.body
  try {
    const productCategoryUpdate = await updatePosition(id, dataProductCategory)
    if (!productCategoryUpdate) {
      return res.respondUpdated({ data: productCategoryUpdate, message: labels.errors.validationID.errorsLoanTypeID })
    }
    if (productCategoryUpdate === 'error Interest') {
      return res.respondUpdated({ data: productCategoryUpdate, message: labels.errors.validationID.errorsInterest })
    }
    if (productCategoryUpdate === 'null LoanTypeID') {
      return res.respondUpdated({ message: labels.errors.validationID.errorsLoanTypeID + ' ' + productCategoryUpdate })
    }
    return res.respondUpdated({ data: productCategoryUpdate, message: labels.success.response.updated })
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
  try {
    const productCategoryDeleted = await removePosition(id)
    if (!productCategoryDeleted) {
      return res.failNotFound({ errors: labels.errors.removeById.errors })
    }
    return res.respondDeleted({ message: labels.success.response.deleted })
  } catch (error) {
    console.log(error)
  }
}
