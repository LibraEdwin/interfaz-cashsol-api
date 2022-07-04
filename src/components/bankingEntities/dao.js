// @ts-check
import { getOptionsPagination } from 'helpers/utils'
import BankingEntityModel from './model'
import '@types'

/**
 * Obtener el id correlativo
 * @returns {Promise<number>}
 */
const correlativeId = async () => {
  const totalDocuments = await BankingEntityModel.countDocumentsWithDeleted()
  return totalDocuments + 1
}

/**
 * Obtener todas las entidades bancarias
 * @param {number} limit
 * @param {number} page
 * @param {object} query
 * @returns
 */
const findAllBankingEntities = async (limit, page, query) => {
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

  return await BankingEntityModel.paginate(
    BankingEntityModel.find(query)
    , options)
}

/**
 * Buscar una entidad bancaria por id
 * @param {number} id
 * @returns {Promise<BankingEntity|null>}
 */
const findBankingEntityById = async (id) => {
  return await BankingEntityModel.findOne({ _id: id })
}

/**
 * Registrar una entidad bancaria
 * @param {BankingEntity} bankingEntity - data de la entidad bancaria
 * @returns {Promise<BankingEntity>}
 */
const registerBankingEntity = async (bankingEntity) => {
  const _id = await correlativeId()
  return await BankingEntityModel.create({
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
const updateBankingEntity = async (id, bankingEntity) => {
  const bankingEntityUpdated = await BankingEntityModel.findOneAndUpdate(
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
const deleteBankingEntityById = async (id) => {
  const result = await BankingEntityModel.deleteById(id)
  return result.matchedCount
}

/**
 * Eliminar todas las entidad bancaria
 */
const deleteAllDocuments = async () => {
  await BankingEntityModel.deleteMany()
}

const findAll = async () => {
  return await BankingEntityModel.find()
}

export default {
  findAllBankingEntities,
  findBankingEntityById,
  registerBankingEntity,
  updateBankingEntity,
  deleteBankingEntityById,
  correlativeId,
  deleteAllDocuments,
  findAll
}
