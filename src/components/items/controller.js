// @ts-check
import ItemDao from './dao'
import ItemDto from './dto'
import labels from './labels'
import '@types'

/**
 * Obtener una lista de rubros
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
const index = async (req, res) => {
  const { limit, page, ...query } = req.query

  const results = await ItemDao.findAllItems(Number(limit), Number(page), { ...query })

  const data = ItemDto.multiple(results, query)

  res.respond({ data })
}

/**
 * Obtener una rubro por su id
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
const getById = async (req, res) => {
  const id = Number(req.params.id)

  const result = await ItemDao.findItemById(id)

  if (!result) {
    return res.failNotFound({ errors: labels.errors.response.notFound })
  }

  const data = ItemDto.single(result)

  return res.respond({ data })
}

/**
 * Crear una rubro
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
const create = async (req, res) => {
  const item = req.body

  const itemCreated = await ItemDao.registerItem(item)

  const data = ItemDto.single(itemCreated)

  return res.respondCreated({ data, message: labels.success.response.created })
}

/**
 * Actualizar una rubro por su id
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
const updateById = async (req, res) => {
  const id = Number(req.params.id)

  const item = req.body

  const itemUpdated = await ItemDao.updateItem(id, item)

  if (!itemUpdated) {
    return res.failNotFound({ errors: labels.errors.response.notFound })
  }

  const data = ItemDto.single(itemUpdated)

  return res.respondUpdated({ data, message: labels.success.response.updated })
}

/**
 * Remover una rubro por su id
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
const deleteById = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const isDeleted = await ItemDao.deleteItemById(id)

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
  return res.respond({ data: { nextId: await ItemDao.correlativeId() } })
}

export default {
  index,
  getById,
  create,
  updateById,
  deleteById,
  getCorrelativeId
}
