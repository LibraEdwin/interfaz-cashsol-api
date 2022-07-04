// @ts-check
import path from 'path'
import fs from 'fs'
import XLSX from 'xlsx'
import { DIR_UPLOAD_PUBLIC } from 'helpers/uploads'
import * as DocumentTypesDao from 'components/documentType/dao'
import ProfessionDao from 'components/profession/dao'
import BankingEntityDao from 'components/bankingEntities/dao'
import * as PositionDao from 'components/position/dao'
import ItemDao from 'components/items/dao'
import UserDao from 'components/users/dao'

export default async () => {
  // const ubigeoFile = fs.readFileSync(path.join(DIR_UPLOAD_PUBLIC, 'Ubigeos_2022.xlsx'))
  // const workbook = XLSX.read(ubigeoFile, { type: 'buffer' })
  // const dataExcel = {}

  // workbook.SheetNames.forEach(sheetName => {
  //   const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
  //   dataExcel[sheetName] = sheet
  // })

  /**
   * ------------------------------------------------
   * Document Types
   * ------------------------------------------------
   */
  if ((await DocumentTypesDao.findAll()).length === 0) {
    const docs = [
      { name: 'DNI' },
      { name: 'Carnet de extranjería' },
      { name: 'RUC' },
      { name: 'Pasaporte' }
    ]

    for (let index = 0; index < docs.length; index++) {
      const documentType = docs[index]
      await DocumentTypesDao.createDocumentType(documentType)
    }
  }

  if ((await ProfessionDao.getAllProfessions()).length === 0) {
    const docs = [
      { name: 'Adminsitrador' },
      { name: 'Abogado' },
      { name: 'Ingeniero civil' },
      { name: 'Desarrollador' }
    ]

    for (let index = 0; index < docs.length; index++) {
      const profession = docs[index]
      await ProfessionDao.createProfession(profession)
    }
  }

  if ((await BankingEntityDao.findAll()).length === 0) {
    const docs = [
      { name: 'Banco de Credito - BCP' },
      { name: 'Interbank' },
      { name: 'BBVA' }
    ]

    for (let index = 0; index < docs.length; index++) {
      const bankingEntity = docs[index]
      await BankingEntityDao.registerBankingEntity(bankingEntity)
    }
  }

  if ((await PositionDao.findAll()).length === 0) {
    const docs = [
      { name: 'Jefe de TI' },
      { name: 'CTO' },
      { name: 'CEO' },
      { name: 'Desarrollador' },
      { name: 'Administrador' },
      { name: 'Contador' }
    ]

    for (let index = 0; index < docs.length; index++) {
      const position = docs[index]
      await PositionDao.createPosition(position)
    }
  }

  if ((await ItemDao.findAll()).length === 0) {
    const docs = [
      { name: 'Tecnologia' },
      { name: 'Minería' },
      { name: 'Educación' }
    ]

    for (let index = 0; index < docs.length; index++) {
      const item = docs[index]
      await ItemDao.registerItem(item)
    }
  }

  if ((await UserDao.findAll()).length === 0) {
    await UserDao.createUser({
      nickname: 'admin',
      email: 'alejo.ramos@prestamoscashsol.com.pe',
      password: '235411%'
    })
  }
}
