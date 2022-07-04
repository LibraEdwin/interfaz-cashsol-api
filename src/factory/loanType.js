import { faker } from '@faker-js/faker'
import '@types'
import { clearLoanType, createLoanType } from 'components/loanType/dao'

/**
 * Obtener un usuario fake
 * @returns {LoanType}
 */
export const geLoanType = () => {
  return {
    name: faker.name.findName()
  }
}

/**
 * Crear Usuarios fake en la bd
 * @param {number} totalDocuments - Total de usuarios a guardar en la bd
 */
const loanTypeFactory = async (totalDocuments) => {
  await clearLoanType()

  for (let index = 0; index < totalDocuments; index++) {
    const userFake = geLoanType()
    await createLoanType(userFake)
  }
}

export default loanTypeFactory
