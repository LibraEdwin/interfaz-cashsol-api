// @ts-check
import { findAllDocumentType } from './dao'
import { multiple } from './dto'
/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export const index = async (req, res) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const documentType = await findAllDocumentType(limit, page)
  const data = multiple(documentType)
  return res.respond({ data })
}
