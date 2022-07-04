// @ts-check
import BankingEntityDao from './dao'
import BankingEntityDto from './dto'
import labels from './labels'
import '@types'

/**
 * Obtener una lista de categorías
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
const index = async (req, res) => {
  const { limit, page, ...query } = req.query

  const results = await BankingEntityDao.findAllBankingEntities(Number(limit), Number(page), { ...query })

  const data = BankingEntityDto.multiple(results, query)

  res.respond({ data })
}

/**
 * Obtener una categoría por su id
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
const getById = async (req, res) => {
  const id = Number(req.params.id)

  const result = await BankingEntityDao.findBankingEntityById(id)

  if (!result) {
    return res.failNotFound({ errors: labels.errors.response.notFound })
  }

  const data = BankingEntityDto.single(result)

  return res.respond({ data })
}

/**
 * Crear una categoría
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
const create = async (req, res) => {
  const bankingEntity = req.body

  const bankingEntityCreated = await BankingEntityDao.registerBankingEntity(bankingEntity)

  const data = BankingEntityDto.single(bankingEntityCreated)

  return res.respondCreated({ data, message: labels.success.response.created })
}

/**
 * Actualizar una categoria por su id
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
const updateById = async (req, res) => {
  const id = Number(req.params.id)

  const bankingEntity = req.body

  const bankingEntityUpdated = await BankingEntityDao.updateBankingEntity(id, bankingEntity)

  if (!bankingEntityUpdated) {
    return res.failNotFound({ errors: labels.errors.response.notFound })
  }

  const data = BankingEntityDto.single(bankingEntityUpdated)

  return res.respondUpdated({ data, message: labels.success.response.updated })
}

/**
 * Remover una categoría por su id
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
const deleteById = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const isDeleted = await BankingEntityDao.deleteBankingEntityById(id)

    if (!isDeleted) {
      return res.failNotFound({ errors: labels.errors.response.notFound })
    }
    return res.respondDeleted({ message: labels.success.response.deleted })
  } catch (error) {
    return res.failServerError({ errors: [error.message] })
  }
}

/**
 * Obtener un id correlativo
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
const getCorrelativeId = async (req, res) => {
  return res.respond({ data: { nextId: await BankingEntityDao.correlativeId() } })
}

export default {
  index,
  getById,
  create,
  updateById,
  deleteById,
  getCorrelativeId
}
