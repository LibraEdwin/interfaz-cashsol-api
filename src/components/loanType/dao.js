import LoanTypeModel from './model'
import '@types'

export async function correlativeId() {
  const totalDocuments = await LoanTypeModel.countDocuments()
  return totalDocuments + 1
}

/**
 *
 * @param {position} documentType
 */

// --------------------------------------------------------------------------------------------------------------------

// Elimina datos falso en la BD por Factory
export const clearLoanType = async () => {
  // await LoanTypeModel.deleteMany()
}

// --------------------------------------------------------------------------------------------------------------------
export const findAllPosition = async (limit, page) => {
  const options = {
    page: page || 1,
    limit: limit || 10,
    sort: { createdAt: 'desc' }
  }

  return await LoanTypeModel.paginate(LoanTypeModel.findOne({}), options)
}

export async function createLoanType(loanType) {
  const { name } = loanType

  const newLoanType = new LoanTypeModel({
    _id: await correlativeId(), name
  })

  return await newLoanType.save()
}

export async function updateLoanType(id, position) {
  const { name } = position

  const validationID = await LoanTypeModel.findById({ _id: id })

  if (!validationID) {
    return validationID
  }

  const positionUpdated = await LoanTypeModel.findOneAndUpdate(
    { _id: id },
    { name },
    {
      new: true,
      runValidation: true
    }
  )

  return positionUpdated
}

export async function removePosition(id) {
  const result = await LoanTypeModel.deleteById(id)
  return result.matchedCount
}

export const getAllLoanType = async () => {
  return await LoanTypeModel.find()
}

export const createLoanTypeTwo = async (loanType) => {
  const newLoanType = new LoanTypeModel(loanType)

  return await newLoanType.save()
}
