// @ts-check
import { getOptionsPagination } from 'helpers/utils'
import ItemModel from './model'
import '@types'

/**
 * Obtener el id correlativo
 * @returns {Promise<number>}
 */
const correlativeId = async () => {
  const totalDocuments = await ItemModel.countDocumentsWithDeleted()
  return totalDocuments + 1
}

const findAll = async () => {
  return await ItemModel.find()
}
/**
 * Obtener todas las entidades bancarias
 * @param {number} limit
 * @param {number} page
 * @param {object} query
 * @returns
 */
const findAllItems = async (limit, page, query) => {
  const options = getOptionsPagination(limit, page)

  const { name } = query

  if (name) {
    query = {
      ...query,
      name: {
        $regex: name,
        $options: 'i'
      }
    }
  }

  return await ItemModel.paginate(
    ItemModel.find(query)
    , options)
}

/**
 * Buscar una entidad bancaria por id
 * @param {number} id
 * @returns {Promise<BankingEntity|null>}
 */
const findItemById = async (id) => {
  return await ItemModel.findOne({ _id: id })
}

/**
 * Registrar una entidad bancaria
 * @param {BankingEntity} bankingEntity - data de la entidad bancaria
 * @returns {Promise<BankingEntity>}
 */
const registerItem = async (bankingEntity) => {
  const _id = await correlativeId()
  return await ItemModel.create({
    ...bankingEntity,
    _id
  })
}

/**
 * Actualizar una entidad bancaria por id
 * @param {number} id - id de la entidad bancaria a actualizar
 * @param {BankingEntity} bankingEntity - data para actualizar
 *
 * @returns {Promise<null|BankingEntity>} - si no se encontró la entidad bancaria
 */
const updateItem = async (id, bankingEntity) => {
  const bankingEntityUpdated = await ItemModel.findOneAndUpdate(
    { _id: id },
    bankingEntity,
    {
      new: true,
      runValidation: true
    }
  )

  if (!bankingEntityUpdated) {
    return null
  }

  return bankingEntityUpdated
}

/**
 * Eliminar una entidad bancaria por su id
 * @param {number} id - id de la entidad bancaria
 * @returns
 */
const deleteItemById = async (id) => {
  const result = await ItemModel.deleteById(id)
  return result.matchedCount
}

/**
 * Eliminar todas las entidad bancaria
 */
const deleteAllDocuments = async () => {
  await ItemModel.deleteMany()
}

export default {
  findAll,
  findAllItems,
  findItemById,
  registerItem,
  updateItem,
  deleteItemById,
  correlativeId,
  deleteAllDocuments
}
