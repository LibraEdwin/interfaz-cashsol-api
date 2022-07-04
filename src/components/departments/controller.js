// @ts-check
import DepartmentDao from './dao'
import DepartmentDto from './dto'

/**
 * Listar departamentos
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function index(req, res) {
  const allDepartments = await DepartmentDao.getAllDepartments()
  const data = DepartmentDto.multiple(allDepartments)
  return res.respond({ data })
}

/**
 * Obtener un departamento
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function getById(req, res) {
  const { id } = req.params
  const departament = await DepartmentDao.getDepartment(id)
  return res.respond({ data: departament })
}
