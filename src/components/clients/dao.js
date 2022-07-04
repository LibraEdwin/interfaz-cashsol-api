// @ts-check
import ClientModel from './model'
import { getOptionsPagination, encryptPassword } from 'helpers/utils'
import '@types'

const getCorrelativeId = async () => {
  const total = await ClientModel.countDocumentsWithDeleted()
  return total + 1
}

/**
 * @tutorial Búsqueda Búsqueda con expresiones regular tipo SQL Like
 * 
 * 👉 Ejemplos 1: Equivalencia búsqueda de function find() y ExpReg con SQL LIKE
 * 
 * model.find({name: /jor/})  // select * from model where name Like '%jor%'
 * model.find({name: /^jor/})  // select * from model where name  Like 'jor%'
 * model.find({name: /jor$/})  // select * from model where name  Like '%a'
 * 
 * new RegExp('jor')  =  /jor/
 * new RegExp('^jor')  =  /^jor/
 * new RegExp('jor$')  =  /jor$/
 * 
 * 👉 Ejemplo 2: Retorno de agregación paginada
 * 
 * return await ClientModel.aggregatePaginate(
      ClientModel.aggregate(query)
      , options)
 * 
 */

const findAll = async (limit, page, query) => {
  const options = getOptionsPagination(limit, page)
  const { name, documentNumber } = query


  if (!name){

    return await ClientModel.paginate(
      ClientModel.find({})
      , options)
  }


  if (name) {
    query = [
      {
        $addFields: {
          newField: {
            $concat: ["$name", " ", "$lastname"],
          }
        }
      },
      {
        $match: {
          newField: {
            $regex: new RegExp(`^${name}`),
            $options: 'i'
          }
        }
      }
    ]

    // console.log(await ClientModel.aggregate(query))

    return await ClientModel.aggregatePaginate(
      ClientModel.aggregate(query)
      , options)
  }


  
  if (documentNumber) {
    query = {
      ...query,
      'document.number': {
        $regex: documentNumber,
        $options: 'i'
      }
    }

    return await ClientModel.paginate(
      ClientModel.find(query)
      , options)

  }


  //// Search with model.find() function ////

  //// Version without ExpReg (Versión 1)
  //
  // if (name) {
  //   query = {
  //     ...query,
  //     name: {
  //       $regex: name,
  //       $options: 'i'
  //     }
  //   }
  // }


  //// Version with ExpReg
  //
  // if (name) {
  //   query = {
  //     ...query,
  //     name: {
  //       $regex: new RegExp(`^${name}`),
  //       $options: 'i'
  //     }
  //   }
  // }
  //
  //
  // console.log(await ClientModel.find(query))

}

const findById = async (id) => {
  return await ClientModel.findOne({ _id: id })
}

const findByDocumentNumber = async (documentNumber) => {
  return await ClientModel.findOne({ 'document.number': documentNumber })
}
const findClientByEmail = async (email) => {
  return await ClientModel.findOne({ email })
}
/**
 *
 * @param {Client} client
 */
const createClient = async (client) => {
  const _id = await getCorrelativeId()
  const password = await encryptPassword(client.password)
  const clientCreated = await ClientModel.create({
    ...client,
    _id,
    password
  })
  return await findById(clientCreated._id)
}

const updateClient = async (id, client) => {
  const clientUpdated = await ClientModel.findOneAndUpdate(
    { _id: id },
    client,
    {
      new: true,
      runValidation: true
    }
  )

  if (!clientUpdated) {
    return null
  }

  return clientUpdated
}

const deleteClientById = async (id) => {
  const result = await ClientModel.deleteById(id)
  return result.matchedCount
}

const clearClients = async () => {
  await ClientModel.deleteMany()
}

export default {
  getCorrelativeId,
  findAll,
  findById,
  findByDocumentNumber,
  findClientByEmail,
  createClient,
  updateClient,
  deleteClientById,
  clearClients
}
