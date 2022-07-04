// @ts-check
import { faker } from '@faker-js/faker'
import BankingEntity from 'components/bankingEntities/dao'
import '@types'

/**
 * Obtener una entidad bancaria fake
 * @returns {BankingEntity}
 */
export const getBankingEntity = () => {
  return {
    name: faker.name.jobArea()
  }
}

/**
 * Crear Entidades Bancarias fake en la bd
 * @param {number} totalDocuments - Total de Entidades bancarias a guardar en la bd
 */
const bankingEntityFactory = async (totalDocuments) => {
  await BankingEntity.deleteAllDocuments()

  for (let index = 0; index < totalDocuments; index++) {
    const bankingEntity = getBankingEntity()
    await BankingEntity.registerBankingEntity(bankingEntity)
  }
}

export default bankingEntityFactory
