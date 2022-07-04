import DocumentTypeModel from './model'
import '@types'
import { getOptionsPagination } from 'helpers/utils'

const correlativeId = async () => {
  const total = await DocumentTypeModel.countDocuments()
  return total + 1
}
/**
 *
 * @param {documentType} documentType
 */

// --------------------------------------------------------------------------------------------------------------------
// Crea datos falso en la BD por Factory
export const createDocumentType = async (documentType) => {
  await DocumentTypeModel.create({ ...documentType, _id: await correlativeId() })
}

// Elimina datos falso en la BD por Factory
export const clearDocumentType = async () => {
  await DocumentTypeModel.deleteMany()
}

// --------------------------------------------------------------------------------------------------------------------
export const findAllDocumentType = async (limit, page) => {
  const options = getOptionsPagination(limit, page)

  return await DocumentTypeModel.paginate(DocumentTypeModel.findOne({}), options)
}

export const findAll = async () => {
  return await DocumentTypeModel.find()
}
