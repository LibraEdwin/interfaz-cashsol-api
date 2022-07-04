// @ts-check
import ProfessionDao from './dao'
import ProfessionDto from './dto'

/**
 * Create a profession
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function create(req, res) {
  const profession = req.body
  const professionCreated = await ProfessionDao.createProfession(profession)
  return res.respondCreated({ data: professionCreated })
}

/**
 * List all professions
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function index(req, res) {
  const allProfessions = await ProfessionDao.getAllProfessions()
  const data = ProfessionDto.multiple(allProfessions)
  res.respond({ data })
}

/**
 * Get a profession by id
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function getById(req, res) {
  const { id } = req.params
  const getProfession = await ProfessionDao.getProfession(id)

  // Validar si se encontro profession por ID
  if (!getProfession) {
    return res.failNotFound({ errors: 'No se puede identificar la profesion ingresada' })
  }
  // Retornar data encontrada
  return res.respond({ data: getProfession })
}

/**
 * Update a profession
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function updateById(req, res) {
  const id = Number(req.params.id)
  const profession = req.body

  // Validar si existe
  const validateExistProfession = await ProfessionDao.professionExist(id)

  if (!validateExistProfession) {
    return res.failNotFound({ errors: 'La profesion indicada no existe' })
  }

  // Actualizar datos
  const dataToUpdate = await ProfessionDao.updateProfession(id, profession)

  // Retornar data actualizada
  return res.respondUpdated({ data: dataToUpdate })
}

/**
 * Delete a profession
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function removeById(req, res) {
  const id = Number(req.params.id)
  const isDeleted = await ProfessionDao.removeProfession(id)

  if (!isDeleted) {
    return res.failNotFound({ errors: `Parece que el id ${id} no existe` })
  }
  return res.respondDeleted({ message: 'Se elimino correctamente' })
}
