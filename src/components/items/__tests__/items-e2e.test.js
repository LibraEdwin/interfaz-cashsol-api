import config from 'config'
import app from 'app'
import supertest from 'supertest'
import mongoose from 'mongoose'
import ItemDao from 'components/items/dao'
import labels from 'components/items/labels'

const api = supertest(app)
const ENDPOINT = '/api/v1/items'
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
 * Listar entidas s
 */
describe('/GET listar rubros', () => {
  test('Debe devolver un 200', async () => {
    const response = await api.get(ENDPOINT)
    const { status } = response
    expect(status).toBe(200)
  })

  test('Debe devolver un 200 con una lista de 2 rubros', async () => {
    await ItemDao.registerItem({ name: 'Rubro 1' })
    await ItemDao.registerItem({ name: 'Rubro 2' })
    const saved = await ItemDao.registerItem({ name: 'Rubro 3' })
    await ItemDao.deleteItemById(saved._id)

    const response = await api.get(ENDPOINT)
    const { body: { code, data: { items } } } = response
    expect(code).toBe(200)
    expect(items.length).toBe(2)
  })

  test('Debe responder un 200 con una rubro en la pagina 3', async () => {
    await ItemDao.registerItem({ name: 'Rubro 1' })
    await ItemDao.registerItem({ name: 'Rubro 2' })
    const saved = await ItemDao.registerItem({ name: 'Rubro 3' })
    await ItemDao.deleteItemById(saved._id)
    await ItemDao.registerItem({ name: 'Rubro 4' })
    await ItemDao.registerItem({ name: 'Rubro 5' })
    await ItemDao.registerItem({ name: 'Rubro 6' })

    const response = await api.get(ENDPOINT).query({ page: 3, limit: 2 })
    const { body: { code, data: { info, items } } } = response

    expect(code).toBe(200)
    expect(info.totalDocs).toBe(5)
    expect(info.page).toBe(3)
    expect(info.limit).toBe(2)
    expect(info.totalPages).toBe(3)
    expect(items.length).toBe(1)
  })
})

/**
 * Obtener una rubro por su ID
 */
describe('/GET/:id obtener una rubro ', () => {
  test('Debe devolver un 400 porque se ingreso un id invalido', async () => {
    const response = await api.get(ENDPOINT + '/someId')
    const { status, body: { description, errors } } = response

    expect(status).toBe(400)
    expect(errors[0]).toBe(labels.errors.response.badId)
    expect(description).toEqual('Bad Request')
  })

  test('Deberia devolver un 404 porque no se encontro la rubro', async () => {
    await ItemDao.registerItem({ name: 'Rubro 1' })

    const response = await api.get(ENDPOINT + '/2')
    const { status, body: { errors } } = response
    expect(status).toBe(404)
    expect(errors).toBe(labels.errors.response.notFound)
  })

  test('Deberia devolver un 404 porque se intento acceder a una rubro eliminada', async () => {
    const item = await ItemDao.registerItem({ name: 'Rubro 1' })

    await ItemDao.deleteItemById(item._id)

    const response = await api.get(ENDPOINT + '/' + item._id)
    const { status, body: { errors } } = response

    expect(status).toBe(404)
    expect(errors).toBe(labels.errors.response.notFound)
  })

  test('Debe devolver un 200 con la rubro  correcta', async () => {
    const item = await ItemDao.registerItem({ name: 'Rubro 1' })

    const response = await api.get(ENDPOINT + '/' + item._id)
    const { status, body: { data } } = response

    expect(status).toBe(200)

    expect(data.id).toBe(item._id)
    expect(data.name).toBe(item.name)
  })
})

/**
 * Crear una rubro
 */
describe('/POST crear una rubro ', () => {
  test('Debe devolver un error 400 porque el nombre de la rubro esta vacia', async () => {
    const item = {}

    const response = await api.post(ENDPOINT).send(item)
    const { status, body: { errors } } = response

    expect(status).toBe(400)
    expect(errors[0]).toEqual(labels.errors.validationData.name.required)
  })

  test('Debe devolver 200 una rubro creada', async () => {
    const item = {
      name: 'Rubro de prueba'
    }
    const response = await api.post(ENDPOINT).send(item)
    const { status, body: { data, message } } = response

    expect(status).toBe(201)
    expect(data.id).toBe(1)
    expect(data.name).toBe(item.name)
    expect(data.deleted).toBe(false)
    expect(message).toEqual(labels.success.response.created)
  })
})

describe('/PATCH/:id actualizar rubro ', () => {
  test('Debe devolver un 400 porque se ingreso un id invalido', async () => {
    const response = await api.delete(ENDPOINT + '/someId')
    const { status, body: { description, errors } } = response

    expect(status).toBe(400)
    expect(errors[0]).toBe(labels.errors.response.badId)
    expect(description).toEqual('Bad Request')
  })

  test('Devuelve 400 con un mensaje porque el nombre no puede estar vacio', async () => {
    const item = await ItemDao.registerItem({ name: 'Rubro 1' })

    const itemUpdated = {
      name: ''
    }

    const response = await api.patch(ENDPOINT + '/' + item._id).send(itemUpdated)
    const { errors, code } = response.body
    expect(code).toBe(400)
    expect(errors[0]).toBe(labels.errors.validationData.name.notEmpty)
  })

  test('Devuelve un 404 porque el id no esta registrado', async () => {
    const itemUpdated = {
      name: 'Nombre actualizado'
    }

    const response = await api.patch(ENDPOINT + '/1').send(itemUpdated)

    const { errors, code } = response.body
    expect(code).toEqual(404)
    expect(errors).toEqual(labels.errors.response.notFound)
  })

  test('Debe devolver un 404 porque se intento actualizar una rubro eliminada', async () => {
    const item = await ItemDao.registerItem({ name: 'Rubro 1' })

    await ItemDao.deleteItemById(item._id)

    const response = await api.patch(ENDPOINT + '/' + item._id).send({ name: 'Rubro intentando actualizar' })
    const { errors, code } = response.body
    expect(code).toBe(404)
    expect(errors).toEqual(labels.errors.response.notFound)
  })

  test('Debe devolver un 200 con la rubro actualizada', async () => {
    const item = await ItemDao.registerItem({ name: 'Rubro 1' })

    const itemUpdated = {
      name: 'Nombre de rubro actualizada'
    }

    const response = await api.patch(ENDPOINT + '/' + item._id).send(itemUpdated)
    const { code, message, data } = response.body
    expect(code).toEqual(200)
    expect(data.id).toBe(item._id)
    expect(data.name).toBe(itemUpdated.name)
    expect(message).toEqual(labels.success.response.updated)

    const newitem = await ItemDao.findItemById(data.id)
    expect(newitem.name).toBe(itemUpdated.name)
    expect(newitem.deleted).toBe(false)
  })
})

/**
 * Eliminar una rubro
 */
describe('/DELETE/:id eliminar rubro ', () => {
  test('Debe devolver un 400 porque se ingreso un id invalido', async () => {
    const response = await api.delete(ENDPOINT + '/someId')
    const { status, body: { description, errors } } = response

    expect(status).toBe(400)
    expect(errors[0]).toBe(labels.errors.response.badId)
    expect(description).toEqual('Bad Request')
  })

  test('Deberia devolver un 404 porque no se encontro la rubro', async () => {
    await ItemDao.registerItem({ name: 'Rubro 1' })

    const response = await api.delete(ENDPOINT + '/2')
    const { status, body: { errors } } = response
    expect(status).toBe(404)
    expect(errors).toBe(labels.errors.response.notFound)
  })

  test('Se elimino la rubro correctamente', async () => {
    const item = await ItemDao.registerItem({ name: 'Rubro 1' })
    const response = await api.delete(ENDPOINT + '/' + item._id)
    const { status, body: { message } } = response

    expect(status).toBe(200)
    expect(message).toEqual(labels.success.response.deleted)

    const r = await ItemDao.findItemById(item._id)
    expect(r).toBeFalsy()
  })
})
