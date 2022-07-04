// @ts-check
import ProductDetailModel from './model'
import { formatCodeWithZeros, getOptionsPagination, getDateWithTheLastHour, getDate } from 'helpers/utils'
import '@types'

const getCorrelativeId = async () => {
  const total = await ProductDetailModel.countDocumentsWithDeleted()
  return total + 1
}

const findAll = async (limit, page, query) => {
  const options = getOptionsPagination(limit, page)
  const { client, productName } = query
  if (client) {
    query = {
      ...query,
      client: Number(client)
    }
  }
  if (productName) {
    query = {
      ...query,
      productName: {
        $regex: '.*' + productName + '.*',
        $options: 'i'
      }
    }
  }
  console.log(query)
  return await ProductDetailModel.paginate(
    ProductDetailModel.find(query).populate('product')
    , options)
}

const findById = async (id) => {
  return await ProductDetailModel.findOne({ _id: id })
}

const create = async (productDetail) => {
  const numPosition = await getCorrelativeId()
  const _id = formatCodeWithZeros(numPosition)

  const productDetailCreated = await ProductDetailModel.create({
    ...productDetail,
    _id,
    receptionDate: getDate()
  })

  return await findById(productDetailCreated._id)
}

const updateProductDetail = async (id, productDetail) => {
  console.log(id)
  const productDetailUpdated = await ProductDetailModel.findOneAndUpdate(
    { _id: id },
    productDetail,
    {
      new: true,
      runValidation: true
    }
  )

  if (!productDetailUpdated) {
    return null
  }

  return productDetailUpdated
}

const deleteProductDetailById = async (id) => {
  const result = await ProductDetailModel.deleteById(id)
  return result.matchedCount
}

const updateReturnDate = async (id) => {
  const productDetailUpdated = await ProductDetailModel.findOneAndUpdate(
    { _id: id },
    {
      returnDate: getDate()
    },
    {
      new: true,
      runValidation: true
    }
  )

  if (!productDetailUpdated) {
    return null
  }

  return productDetailUpdated
}

const clearDetailModel = async () => {
  return await ProductDetailModel.deleteMany()
}

export default {
  getCorrelativeId,
  findAll,
  clearDetailModel,
  deleteProductDetailById,
  updateProductDetail,
  updateReturnDate,
  findById,
  create
}
