import ProductModel from './model'
import '@types'
import ProductCategoryModel from 'components/productCategory/model'
import { getOptionsPagination } from 'helpers/utils'

export async function correlativeId() {
  const totalDocuments = await ProductModel.countDocumentsWithDeleted()
  return totalDocuments + 1
}

// Elimina datos falso en la BD por Factory
export const clearProduct = async () => {
  // await ProductModel.deleteMany()
}

// Obtener productos por una categoría
export const findProductsByCategory = async (id, limit, page, query) => {
  const options = getOptionsPagination(limit, page)

  return await ProductModel.paginate(ProductModel.find({ productCategoryID: id }), options)
}

export const findProductById = async (id) => {
  return await ProductModel.findById(id)
}
// --------------------------------------------------------------------------------------------------------------------
export const findAllProduct = async (limit, page, prots) => {
  const options = getOptionsPagination(limit, page)
  const { name } = prots

  if (name) {
    prots = {
      ...prots,
      name: {
        $regex: '.*' + name + '.*',
        $options: 'i'
      }
    }
  }

  return await ProductModel.paginate(
    ProductModel.find(prots).populate('productCategoryID')
    , options)
}

export async function creatProduct(product) {
  const { name, productCategoryID } = product

  const validationproductCategoryID = await ProductCategoryModel.findById({ _id: productCategoryID })
  if (!validationproductCategoryID) {
    return 'null productCategoryID'
  }
  const newPosition = new ProductModel({
    _id: await correlativeId(), name, productCategoryID
  })

  return await newPosition.save()
}

export async function updateProduct(id, product) {
  const { name, productCategoryID } = product

  const validationproductCategoryID = await ProductCategoryModel.findById({ _id: productCategoryID })
  if (!validationproductCategoryID) {
    return 'null productCategoryID'
  }
  const validationID = await ProductModel.findById({ _id: id })

  if (!validationID) {
    return validationID
  }

  const productUpdated = await ProductModel.findOneAndUpdate(
    { _id: id },
    { name, productCategoryID },
    {
      new: true,
      runValidation: true
    }
  )

  return productUpdated
}

export async function removePosition(id) {
  const result = await ProductModel.deleteById(id)
  return result.matchedCount
}

export const getAllProduct = async () => {
  return await ProductModel.find()
}

export const createProductTwo = async (product) => {
  const newProduct = new ProductModel(product)

  return await newProduct.save()
}
