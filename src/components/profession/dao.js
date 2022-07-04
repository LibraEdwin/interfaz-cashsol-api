// @ts-check
import ProfessionModel from './model'

/**
 * Generate correlative ID
 *
 */
const correlativeId = async () => {
  const totalDocuments = await ProfessionModel.countDocumentsWithDeleted()
  return totalDocuments + 1
}

/**
 * Create profession
 *
 */
const createProfession = async (profession) => {
  const _id = await correlativeId()
  const newProfession = new ProfessionModel({
    _id,
    ...profession
  })
  return newProfession.save()
}

/**
 * List professions
 *
 */
const getAllProfessions = async () => {
  return await ProfessionModel.find({})
}

/**
 * Get a profession
 *
 */
const getProfession = async (id) => {
  return await ProfessionModel.findOne({ _id: id })
}

/**
 * Update a profession
 *
 */
const updateProfession = async (id, profession) => {
  const professionUpdated = await ProfessionModel.findByIdAndUpdate({ _id: id }, profession, { new: true, runValidation: true })

  if (!professionUpdated) {
    return null
  }
  return professionUpdated
}

/**
 * Exist profession
 *
 */
const professionExist = async (id) => {
  return await ProfessionModel.exists({ _id: id })
}

/**
 * Delete a profession
 *
 */
const removeProfession = async (id) => {
  const result = await ProfessionModel.deleteById(id)
  return result.matchedCount
}

export default {
  correlativeId,
  createProfession,
  getAllProfessions,
  getProfession,
  updateProfession,
  professionExist,
  removeProfession
}
