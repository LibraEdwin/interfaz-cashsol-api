import config from 'config'
import app from 'app'
import supertest from 'supertest'
import mongoose from 'mongoose'
import BankingEntityDao from 'components/bankingEntities/dao'
import labels from 'components/bankingEntities/labels'

const api = supertest(app)
const ENDPOINT = '/api/v1/banking-entities'
const { MONGODB_URI } = config.get('DATABASE')

beforeEach((done) => {
  mongoose.connect(
    MONGODB_URI,
    { useNewUrlParser: true },
    () => done()
  )
})

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  })
})

/**
 * Listar entidas bancarias
 */
describe('/GET listar entidades bancarias', () => {
  test('Debe devolver un 200', async () => {
    const response = await api.get(ENDPOINT)
    const { status } = response
    expect(status).toBe(200)
  })

  test('Debe devolver un 200 con una lista de 2 entidades', async () => {
    await BankingEntityDao.registerBankingEntity({ name: 'Entidad 1' })
    await BankingEntityDao.registerBankingEntity({ name: 'Entidad 2' })
    const saved = await BankingEntityDao.registerBankingEntity({ name: 'Entidad 3' })
    await BankingEntityDao.deleteBankingEntityById(saved._id)

    const response = await api.get(ENDPOINT)
    const { body: { code, data: { bankingEntities } } } = response
    expect(code).toBe(200)
    expect(bankingEntities.length).toBe(2)
  })

  test('Debe responder un 200 con una entidad en la pagina 3', async () => {
    await BankingEntityDao.registerBankingEntity({ name: 'Entidad 1' })
    await BankingEntityDao.registerBankingEntity({ name: 'Entidad 2' })
    const saved = await BankingEntityDao.registerBankingEntity({ name: 'Entidad 3' })
    await BankingEntityDao.deleteBankingEntityById(saved._id)
    await BankingEntityDao.registerBankingEntity({ name: 'Entidad 4' })
    await BankingEntityDao.registerBankingEntity({ name: 'Entidad 5' })
    await BankingEntityDao.registerBankingEntity({ name: 'Entidad 6' })

    const response = await api.get(ENDPOINT).query({ page: 3, limit: 2 })
    const { body: { code, data: { info, bankingEntities } } } = response

    expect(code).toBe(200)
    expect(info.totalDocs).toBe(5)
    expect(info.page).toBe(3)
    expect(info.limit).toBe(2)
    expect(info.totalPages).toBe(3)
    expect(bankingEntities.length).toBe(1)
  })
})

/**
 * Obtener una entidad por su ID
 */
describe('/GET/:id obtener una entidad bancaria', () => {
  test('Debe devolver un 400 porque se ingreso un id invalido', async () => {
    const response = await api.get(ENDPOINT + '/someId')
    const { status, body: { description, errors } } = response

    expect(status).toBe(400)
    expect(errors[0]).toBe(labels.errors.response.badId)
    expect(description).toEqual('Bad Request')
  })

  test('Deberia devolver un 404 porque no se encontro la entidad', async () => {
    await BankingEntityDao.registerBankingEntity({ name: 'Entidad 1' })

    const response = await api.get(ENDPOINT + '/2')
    const { status, body: { errors } } = response
    expect(status).toBe(404)
    expect(errors).toBe(labels.errors.response.notFound)
  })

  test('Deberia devolver un 404 porque se intento acceder a una entidad eliminada', async () => {
    const bankingEntity = await BankingEntityDao.registerBankingEntity({ name: 'Entidad 1' })

    await BankingEntityDao.deleteBankingEntityById(bankingEntity._id)

    const response = await api.get(ENDPOINT + '/' + bankingEntity._id)
    const { status, body: { errors } } = response

    expect(status).toBe(404)
    expect(errors).toBe(labels.errors.response.notFound)
  })

  test('Debe devolver un 200 con la entidad bancaria correcta', async () => {
    const bankingEntity = await BankingEntityDao.registerBankingEntity({ name: 'Entidad 1' })

    const response = await api.get(ENDPOINT + '/' + bankingEntity._id)
    const { status, body: { data } } = response

    expect(status).toBe(200)

    expect(data.id).toBe(bankingEntity._id)
    expect(data.name).toBe(bankingEntity.name)
  })
})

/**
 * Crear una entidad bancaria
 */
describe('/POST crear una entidad bancaria', () => {
  test('Debe devolver un error 400 porque el nombre de la entidad esta vacia', async () => {
    const bankingEntity = {}

    const response = await api.post(ENDPOINT).send(bankingEntity)
    const { status, body: { errors } } = response

    expect(status).toBe(400)
    expect(errors[0]).toEqual(labels.errors.validationData.name.required)
  })

  test('Debe devolver 200 una entidad creada', async () => {
    const bankingEntity = {
      name: 'Entidad de prueba'
    }
    const response = await api.post(ENDPOINT).send(bankingEntity)
    const { status, body: { data, message } } = response

    expect(status).toBe(201)
    expect(data.id).toBe(1)
    expect(data.name).toBe(bankingEntity.name)
    expect(data.deleted).toBe(false)
    expect(message).toEqual(labels.success.response.created)
  })
})

describe('/PATCH/:id actualizar entidad bancaria', () => {
  test('Debe devolver un 400 porque se ingreso un id invalido', async () => {
    const response = await api.delete(ENDPOINT + '/someId')
    const { status, body: { description, errors } } = response

    expect(status).toBe(400)
    expect(errors[0]).toBe(labels.errors.response.badId)
    expect(description).toEqual('Bad Request')
  })

  test('Devuelve 400 con un mensaje porque el nombre no puede estar vacio', async () => {
    const bankingEntity = await BankingEntityDao.registerBankingEntity({ name: 'Entidad 1' })

    const bankingEntityUpdated = {
      name: ''
    }

    const response = await api.patch(ENDPOINT + '/' + bankingEntity._id).send(bankingEntityUpdated)
    const { errors, code } = response.body
    expect(code).toBe(400)
    expect(errors[0]).toBe(labels.errors.validationData.name.notEmpty)
  })

  test('Devuelve un 404 porque el id no esta registrado', async () => {
    const bankingEntityUpdated = {
      name: 'Nombre actualizado'
    }

    const response = await api.patch(ENDPOINT + '/1').send(bankingEntityUpdated)

    const { errors, code } = response.body
    expect(code).toEqual(404)
    expect(errors).toEqual(labels.errors.response.notFound)
  })

  test('Debe devolver un 404 porque se intento actualizar una entidad eliminada', async () => {
    const bankingEntity = await BankingEntityDao.registerBankingEntity({ name: 'Entidad 1' })

    await BankingEntityDao.deleteBankingEntityById(bankingEntity._id)

    const response = await api.patch(ENDPOINT + '/' + bankingEntity._id).send({ name: 'Entidad intentando actualizar' })
    const { errors, code } = response.body
    expect(code).toBe(404)
    expect(errors).toEqual(labels.errors.response.notFound)
  })

  test('Debe devolver un 200 con la entidad actualizada', async () => {
    const bankingEntity = await BankingEntityDao.registerBankingEntity({ name: 'Entidad 1' })

    const bankingEntityUpdated = {
      name: 'Nombre de entidad actualizada'
    }

    const response = await api.patch(ENDPOINT + '/' + bankingEntity._id).send(bankingEntityUpdated)
    const { code, message, data } = response.body
    expect(code).toEqual(200)
    expect(data.id).toBe(bankingEntity._id)
    expect(data.name).toBe(bankingEntityUpdated.name)
    expect(message).toEqual(labels.success.response.updated)

    const newBankingEntity = await BankingEntityDao.findBankingEntityById(data.id)
    expect(newBankingEntity.name).toBe(bankingEntityUpdated.name)
    expect(newBankingEntity.deleted).toBe(false)
  })
})

/**
 * Eliminar una entidad bancaria
 */
describe('/DELETE/:id eliminar entidad bancaria', () => {
  test('Debe devolver un 400 porque se ingreso un id invalido', async () => {
    const response = await api.delete(ENDPOINT + '/someId')
    const { status, body: { description, errors } } = response

    expect(status).toBe(400)
    expect(errors[0]).toBe(labels.errors.response.badId)
    expect(description).toEqual('Bad Request')
  })

  test('Deberia devolver un 404 porque no se encontro la entidad', async () => {
    await BankingEntityDao.registerBankingEntity({ name: 'Entidad 1' })

    const response = await api.delete(ENDPOINT + '/2')
    const { status, body: { errors } } = response
    expect(status).toBe(404)
    expect(errors).toBe(labels.errors.response.notFound)
  })

  test('Se elimino la entidad correctamente', async () => {
    const bankingEntity = await BankingEntityDao.registerBankingEntity({ name: 'Entidad 1' })
    const response = await api.delete(ENDPOINT + '/' + bankingEntity._id)
    const { status, body: { message } } = response

    expect(status).toBe(200)
    expect(message).toEqual(labels.success.response.deleted)

    const r = await BankingEntityDao.findBankingEntityById(bankingEntity._id)
    expect(r).toBeFalsy()
  })
})
