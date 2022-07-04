import PositionModel from './model'
import '@types'
import { getOptionsPagination } from 'helpers/utils'

export async function correlativeId() {
  const totalDocuments = await PositionModel.countDocuments()
  return totalDocuments + 1
}

/**
 *
 * @param {position} documentType
 */

// --------------------------------------------------------------------------------------------------------------------

// Elimina datos falso en la BD por Factory
export const clearPosition = async () => {
  await PositionModel.deleteMany()
}

export const findAll = async () => {
  return await PositionModel.find()
}
// --------------------------------------------------------------------------------------------------------------------
export const findAllPosition = async (limit, page) => {
  const options = getOptionsPagination(limit, page)

  return await PositionModel.paginate(PositionModel.findOne({}), options)
}

export async function createPosition(position) {
  const { name } = position

  const newPosition = new PositionModel({
    _id: await correlativeId(), name
  })

  return await newPosition.save()
}

export async function updatePosition(id, position) {
  const { name } = position

  const validationID = await PositionModel.findById({ _id: id })

  if (!validationID) {
    return validationID
  }

  const positionUpdated = await PositionModel.findOneAndUpdate(
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
  const result = await PositionModel.deleteById(id)
  return result.matchedCount
}
