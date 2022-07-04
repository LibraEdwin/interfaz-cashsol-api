// @ts-check
import ProvinceModel from './model'

const getAllProvinces = async () => {
  return await ProvinceModel.find()
}

const getByDepartment = async (id) => {
  return await ProvinceModel.find({ departmentId: id })
    .populate('departmentId')
}

/**
 * Obtener una provincia
 * @param {string} codigo
 */
const getProvince = async (codigo) => {
  return await ProvinceModel.findOne({ _id: codigo })
    .populate('departmentId')
}

const createProvince = async (province) => {
  await ProvinceModel.create(province)
}

export default {
  getAllProvinces,
  getByDepartment,
  getProvince,
  createProvince
}
