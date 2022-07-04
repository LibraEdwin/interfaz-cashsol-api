// @ts-check
import path from 'path'
import fs from 'fs'
import XLSX from 'xlsx'
import { DIR_UPLOAD_PUBLIC } from 'helpers/uploads'
import DepartmentDao from 'components/departments/dao'
import DistictDao from 'components/districts/dao'
import ProvinceDao from 'components/provinces/dao'

export default async () => {
  const ubigeoFile = fs.readFileSync(path.join(DIR_UPLOAD_PUBLIC, 'Ubigeos_2022.xlsx'))
  const workbook = XLSX.read(ubigeoFile, { type: 'buffer' })
  const dataExcel = {}

  workbook.SheetNames.forEach(sheetName => {
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
    dataExcel[sheetName] = sheet
  })

  const { departments, provinces, districts } = dataExcel

  /**
   * -------------------------------------------------
   * Cargar departamentos
   * -------------------------------------------------
   */
  if ((await DepartmentDao.getAllDepartments()).length === 0) {
    for (let index = 0; index < departments.length; index++) {
      await DepartmentDao.createDepartment(departments[index])
    }
  }
  /**
   * -------------------------------------------------
   * Cargar provincias
   * -------------------------------------------------
   */
  if ((await ProvinceDao.getAllProvinces()).length === 0) {
    for (let index = 0; index < provinces.length; index++) {
      const { departmentId, _id, name } = provinces[index]
      await ProvinceDao.createProvince(
        {
          _id: departmentId + _id,
          name,
          departmentId
        }
      )
    }
  }
  /**
   * -------------------------------------------------
   * Cargar distritos
   * -------------------------------------------------
   */
  if ((await DistictDao.getAllDistricts()).length === 0) {
    for (let index = 0; index < districts.length; index++) {
      const { departmentId, provinceId, _id, name } = districts[index]
      await DistictDao.createDistric(
        {
          _id: departmentId + provinceId + _id,
          name,
          provinceId: departmentId + provinceId,
          departmentId
        }
      )
    }
  }
}
