// @ts-check
import { createLoanType, findAllPosition, removePosition, updateLoanType } from './dao'
import { multiple } from './dto'
import labels from './labels'
/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export const index = async (req, res) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const loanType = await findAllPosition(limit, page)
  const data = multiple(loanType)
  return res.respond({ data })
}
/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function create(req, res) {
  const newPosition = req.body
  try {
    const loanTypeCreate = await createLoanType(newPosition)
    return res.respondCreated({ data: loanTypeCreate, message: labels.success.response.created })
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
  const dataLoanType = req.body
  try {
    const positionUpdate = await updateLoanType(id, dataLoanType)
    if (!positionUpdate) {
      return res.respondUpdated({ data: positionUpdate, message: labels.errors.validationID.errors })
    }
    return res.respondUpdated({ data: positionUpdate, message: labels.success.response.updated })
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
  const loanTypeDeleted = await removePosition(id)
  if (!loanTypeDeleted) {
    return res.failNotFound({ errors: labels.errors.removeById.errors })
  }
  return res.respondDeleted({ message: labels.success.response.deleted })
}
