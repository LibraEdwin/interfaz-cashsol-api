// @ts-check
import { createPosition, findAllPosition, removePosition, updatePosition } from './dao'
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
  const position = await findAllPosition(limit, page)
  const data = multiple(position)
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
    const positionCreate = await createPosition(newPosition)
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
  const dataSupplier = req.body
  try {
    const positionUpdate = await updatePosition(id, dataSupplier)
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
  const positionDeleted = await removePosition(id)
  if (!positionDeleted) {
    return res.failNotFound({ errors: labels.errors.removeById.errors })
  }
  return res.respondDeleted({ message: labels.success.response.deleted })
}
