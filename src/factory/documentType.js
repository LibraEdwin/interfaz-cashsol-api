import { faker } from '@faker-js/faker'
import '@types'
import { clearDocumentType, createDocumentType } from 'components/documentType/dao'

/**
 * Obtener un usuario fake
 * @returns {DocumentType}
 */
export const getDocumentTypeFake = (num) => {
  return {
    name: faker.name.findName()
  }
}

/**
 * Crear Usuarios fake en la bd
 * @param {number} totalDocuments - Total de usuarios a guardar en la bd
 */
const documentTypeFactory = async (totalDocuments) => {
  await clearDocumentType()

  for (let index = 0; index < totalDocuments; index++) {
    const userFake = getDocumentTypeFake(index)
    await createDocumentType(userFake)
  }
}

export default documentTypeFactory
