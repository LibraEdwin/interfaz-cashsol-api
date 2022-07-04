// @ts-check
import { faker } from '@faker-js/faker'
import ClientDao from 'components/clients/dao'
import { MARITAL_STATUS_ENUM, EMPLOYEE_STATUS_ENUM } from 'components/clients/model'
import '@types'

/**
 *
 * @param {number} professionId
 * @param {number} documentTypeId
 * @param {number} positionId
 * @param {number} bankId
 * @param {number} itemId
 *
 * @returns {Client}
 */
export function getClientFake(professionId, documentTypeId, positionId, bankId, itemId) {
  return {
    name: faker.name.firstName('male'),
    lastname: faker.name.lastName('male'),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: {
      codCountry: 51,
      number: 987654321
    },
    profession: professionId,
    maritalStatus: MARITAL_STATUS_ENUM[0],
    employmentStatus: EMPLOYEE_STATUS_ENUM[0],
    addressData: {
      address: faker.address.secondaryAddress(),
      district: '010101'
    },
    document: {
      type: documentTypeId,
      number: (faker.datatype.number({ min: 10000000, max: 999999999999999, precision: 1 })).toString()
    },
    company: {
      position: positionId,
      name: faker.company.companyName(),
      address: faker.address.secondaryAddress(),
      item: itemId
    },
    bankingEntity: bankId,
    accountNumber: faker.datatype.uuid()
  }
}

/**
 * Crear una lista de clientes
 * @param {number} totalDocuments
 */
async function createListClients(totalDocuments) {
  // limpiar todos los clientes ya generador
  await ClientDao.clearClients()

  for (let index = 0; index < totalDocuments; index++) {
    const clientFake = getClientFake(1, 1, 1, 1, 1)
    // guardar en la base de datos
    await ClientDao.createClient(clientFake)
  }
}

export default createListClients
