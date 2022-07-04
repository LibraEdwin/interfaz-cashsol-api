// @ts-check
import DistrictModel from './model'

const getAllDistricts = async () => {
  return await DistrictModel.find()
}

/**
 * Obtener una provincia
 * @param {string} id
 */
const getDistrict = async (id) => {
  return await DistrictModel.findOne({ _id: id })
    .populate('provinceId')
    .populate('departmentId')
}

const createDistric = async (district) => {
  await DistrictModel.create(district)
}

/**
 * Validar si existe codigo de ubigeo
 * @param {string} id
 *
 * @return {Promise<any>}
 */
const districtExist = async (id) => {
  return await DistrictModel.exists({ _id: id })
}

const getByProvince = async (id) => {
  return await DistrictModel.find({ provinceId: id })
    .populate('provinceId')
    .populate('departmentId')
}

export default {
  getAllDistricts,
  getDistrict,
  districtExist,
  createDistric,
  getByProvince
}
