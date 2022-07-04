// @ts-check
import ProductDetailDao from './dao'
import ProductDetailDto from './dto'
import labels from './labels'
import Bucket from 'backing/storages/google-cloud-storage'
import { deleteFileTemp, DIR_UPLOAD_TEMP } from 'helpers/uploads'
import path from 'path'

const NAME_FOLDER_UPLOAD = 'uploads/tu-mercado/productos/'

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
async function index(req, res) {
  try {
    const { limit, page, ...query } = req.query

    const clients = await ProductDetailDao.findAll(Number(limit), Number(page), { ...query })

    const data = ProductDetailDto.multiple(clients, query)

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
const getById = async (req, res) => {
  try {
    const { id } = req.params
    const productDetailFound = await ProductDetailDao.findById(id)

    if (!productDetailFound) {
      return res.failNotFound({ errors: [labels.errors.response.notFound] })
    }

    const data = ProductDetailDto.single(productDetailFound)

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
const create = async (req, res) => {
  try {
    const productDetail = req.body
    const clientCreated = await ProductDetailDao.create(productDetail)
    const data = ProductDetailDto.single(clientCreated)
    return res.respondCreated({ data })
  } catch (error) {
    console.log(error)
    return res.failServerError({ errors: [error.message] })
  }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
const updateById = async (req, res) => {
  try {
    const { id } = req.params
    const productDetail = req.body

    const productDetailUpdated = await ProductDetailDao.updateProductDetail(id, productDetail)

    if (!productDetailUpdated) {
      return res.failNotFound({ errors: [labels.errors.response.notFound] })
    }

    const data = ProductDetailDto.single(productDetailUpdated)

    return res.respondUpdated({ data })
  } catch (error) {
    return res.failServerError({ errors: [error.message] })
  }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
const removeById = async (req, res) => {
  try {
    const { id } = req.params

    const isDeleted = await ProductDetailDao.deleteProductDetailById(id)

    if (!isDeleted) {
      return res.failNotFound({ errors: [labels.errors.response.notFound] })
    }

    return res.respondDeleted({ message: labels.success.response.deleted })
  } catch (error) {
    return res.failServerError({ errors: [error.message] })
  }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
const deliverProduct = async (req, res) => {
  const { id } = req.params

  const productDetailDelivered = await ProductDetailDao.updateReturnDate(id)

  if (!productDetailDelivered) {
    return res.failNotFound({ errors: [labels.errors.response.notFound] })
  }
  try {
    return res.respondUpdated({ message: labels.success.response.delivered })
  } catch (error) {
    return res.failServerError({ errors: [error.message] })
  }
}

export default {
  index,
  getById,
  removeById,
  updateById,
  create,
  deliverProduct
}
