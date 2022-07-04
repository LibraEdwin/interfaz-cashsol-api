// @ts-check
import path from 'path'
import fs from 'fs'
import XLSX from 'xlsx'
import { DIR_UPLOAD_PUBLIC } from 'helpers/uploads'
import { createLoanTypeTwo, getAllLoanType } from 'components/loanType/dao'
import { createProductTwo, getAllProduct } from 'components/product/dao'
import { createProductCategoryTwo, getAllProductCategory } from 'components/productCategory/dao'

export default async () => {
  const productFile = fs.readFileSync(path.join(DIR_UPLOAD_PUBLIC, 'Product_2022.xlsx'))
  const workbook = XLSX.read(productFile, { type: 'buffer' })
  const dataExcel = {}

  workbook.SheetNames.forEach(sheetName => {
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
    dataExcel[sheetName] = sheet
  })
  const { loanType, productCategory, product } = dataExcel

  /**
   * -------------------------------------------------
   * Cargar de tipo de prestamo
   * -------------------------------------------------
   */
  if ((await getAllLoanType()).length === 0) {
    for (let index = 0; index < loanType.length; index++) {
      await createLoanTypeTwo(loanType[index])
    }
  }
  /**
   * -------------------------------------------------
   * Cargar de categoria de producto
   * -------------------------------------------------
   */
  if ((await getAllProductCategory()).length === 0) {
    for (let index = 0; index < productCategory.length; index++) {
      await createProductCategoryTwo(productCategory[index])
    }
  }
  /**
   * -------------------------------------------------
   * Cargar producto
   * -------------------------------------------------
   */
  if ((await getAllProduct()).length === 0) {
    for (let index = 0; index < product.length; index++) {
      await createProductTwo(product[index])
    }
  }
}
