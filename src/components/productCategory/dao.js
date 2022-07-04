import ProductCategoryModel from './model'
import '@types'
import LoanTypeModel from 'components/loanType/model'
import { getOptionsPagination } from 'helpers/utils'

export async function correlativeId() {
  const totalDocuments = await ProductCategoryModel.countDocuments()
  return totalDocuments + 1
}

/**
 *
 * @param {ProductCategory} documentType
 */

// --------------------------------------------------------------------------------------------------------------------

// Elimina datos falso en la BD por Factory
export const clearProductCategory = async () => {
  // await ProductCategoryModel.deleteMany()
}

// --------------------------------------------------------------------------------------------------------------------
export const findAllProductCategory = async (limit, page) => {
  const options = getOptionsPagination(limit, page)

  return await ProductCategoryModel.paginate(ProductCategoryModel.findOne({}), options)
}

export async function createProductCategory(productCategory) {
  const { name, loanTypeID, minInterest, maxInterest } = productCategory

  const validationLoanTypeID = await LoanTypeModel.findById({ _id: loanTypeID })
  if (maxInterest < minInterest) {
    return 'error Interest'
  }
  if (!validationLoanTypeID) {
    return 'null LoanTypeID'
  }

  const newProductCategory = new ProductCategoryModel({
    _id: await correlativeId(), name, loanTypeID, minInterest, maxInterest
  })

  return await newProductCategory.save()
}

export async function updatePosition(id, position) {
  const { name, loanTypeID, minInterest, maxInterest } = position

  const validationLoanTypeID = await LoanTypeModel.findById({ _id: loanTypeID })
  if (maxInterest < minInterest) {
    return 'error Interest'
  }
  if (!validationLoanTypeID) {
    return 'null LoanTypeID'
  }
  const validationID = await ProductCategoryModel.findById({ _id: id })

  if (!validationID) {
    return validationID
  }

  const productCategoryUpdated = await ProductCategoryModel.findOneAndUpdate(
    { _id: id },
    { name, loanTypeID, minInterest, maxInterest },
    {
      new: true,
      runValidation: true
    }
  )

  return productCategoryUpdated
}

export const getAllProductCategory = async () => {
  return await ProductCategoryModel.find()
}

export const createProductCategoryTwo = async (productCategory) => {
  const newProductCategory = new ProductCategoryModel(productCategory)

  return await newProductCategory.save()
}

export async function removePosition(id) {
  const result = await ProductCategoryModel.deleteById(id)
  return result.matchedCount
}
