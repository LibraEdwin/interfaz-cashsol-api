// @ts-check
import '@types'
import DepartamentModel from './model'

/**
 * Todos los deparatamentos
 * @returns
 */
const getAllDepartments = async() => {
  return await DepartamentModel.find()
}

/**
 * Obtener un departamento
 * @param {string} codigo
 */
const getDepartment = async (codigo) => {
  return await DepartamentModel.findOne({ _id: codigo })
}

/**
 * Crear un departamento
 * @param {Department} department
 */
const createDepartment = async (department) => {
  await DepartamentModel.create(department)
}

export default {
  getAllDepartments,
  getDepartment,
  createDepartment
}
