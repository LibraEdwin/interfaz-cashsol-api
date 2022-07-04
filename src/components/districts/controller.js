// @ts-check
import DistrictDao from './dao'
import DistrictDto from './dto'

/**
 * Listar distritos
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function index(req, res) {
  const allDistritcts = await DistrictDao.getAllDistricts()
  const data = DistrictDto.multiple(allDistritcts)
  return res.respond({ data })
}

/**
 * Obtener un distrito
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function getById(req, res) {
  const { id } = req.params
  const district = await DistrictDao.getDistrict(id)
  const data = DistrictDto.single(district)
  return res.respond({ data })
}

export async function getByProvince(req, res) {
  const { id } = req.params
  const districts = await DistrictDao.getByProvince(id)
  const data = DistrictDto.multiple(districts)
  return res.respond({ data })
}
