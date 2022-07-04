import request from 'supertest'
import app from 'app'
import config from 'config'
import mongoose from 'mongoose'
import ClientDao from 'components/clients/dao'
import { getClientFake } from 'factory/clients'
import labels from '../labels'

const api = request(app)
const ENPOINT = '/api/v1/clients'
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

describe('/GET list client', () => {
  test('Deberia devolver un 200 con un cliente', async () => {
    const clientFake = getClientFake(1, 1, 1, 1, 1)
    // save clients
    await ClientDao.createClient(clientFake)

    const response = await api.get(ENPOINT)
    const { status, body: { code, data } } = response

    expect(status).toBe(200)
    expect(code).toBe(200)
    expect(data.info.totalDocs).toBe(1)
    expect(data.clients.length).toBe(1)
  })

  test('Deberia devolver un 200, la bd tiene 4 registros pero devuelve 3 clientes sin el que esta eliminado', async () => {
    const clientFakeOne = getClientFake(1, 1, 1, 1, 1)
    const clientFakeTwo = getClientFake(1, 1, 1, 1, 1)
    const clientFakeThree = getClientFake(1, 1, 1, 1, 1)
    const clientFakeFour = getClientFake(1, 1, 1, 1, 1)
    // save clients
    const client = await ClientDao.createClient(clientFakeOne)
    await ClientDao.createClient(clientFakeTwo)
    await ClientDao.createClient(clientFakeThree)
    await ClientDao.createClient(clientFakeFour)

    await ClientDao.deleteClientById(client._id)

    const response = await api.get(ENPOINT)
    const { status, body: { code, data } } = response

    expect(status).toBe(200)
    expect(code).toBe(200)
    expect(data.info.totalDocs).toBe(3)
    expect(data.clients.length).toBe(3)
  })
})

describe('/GET/:id client by id', () => {
  test('Deberia devolver un 400 porque el id es de formato incorrecto', async () => {
    const response = await api.get(ENPOINT + '/sd13')
    const { status, body: { code, errors } } = response

    expect(status).toBe(400)
    expect(code).toBe(400)
    expect(errors.includes(labels.errors.response.badId))
  })

  test('Deberia devolver un 404 porque no se encontro el cliente', async () => {
    const response = await api.get(ENPOINT + '/101')
    const { status, body: { code, errors } } = response

    expect(status).toBe(404)
    expect(code).toBe(404)
    expect(errors.includes(labels.errors.response.notFound))
  })

  test('Deberia devolver un 404 porque no se encontro un cliente que fue eliminado', async () => {
    const clientFake = getClientFake(1, 1, 1, 1, 1)
    const clientSaved = await ClientDao.createClient(clientFake)
    await ClientDao.deleteClientById(clientSaved._id)

    const response = await api.get(ENPOINT + '/' + clientSaved._id)
    const { status, body: { code, errors } } = response

    expect(status).toBe(404)
    expect(code).toBe(404)
    expect(errors.includes(labels.errors.response.notFound))
  })

  test('Deberia devolver un 200 con un cliente', async () => {
    const clientFake = getClientFake(1, 1, 1, 1, 1)
    // save clients
    const client = await ClientDao.createClient(clientFake)

    const response = await api.get(ENPOINT + '/' + client._id)
    const { status, body: { code, data } } = response

    expect(status).toBe(200)
    expect(code).toBe(200)
    expect(data.id).toBe(client._id)
    expect(data.name).toBe(clientFake.name)
    expect(data.lastname).toBe(clientFake.lastname)
  })
})

describe('/GET/document-number/:number get client by document number', () => {
  test('Deberia devolver un 400 porque el numero de documento no es numerico', async () => {
    const response = await api.get(ENPOINT + '/document-number/someId')
    const { status, body: { errors } } = response

    expect(status).toBe(400)
    expect(errors.includes(labels.errors.response.badDocumentNumber)).toBe(true)
  })

  test('Deberia devolver un 400 porque el numero de documento debe tener entre 8 y 15 caracteres', async () => {
    const response = await api.get(ENPOINT + '/document-number/2')
    const { status, body: { errors } } = response

    expect(status).toBe(400)
    expect(errors.includes(labels.errors.response.badLengthDocumentNumber)).toBe(true)
  })

  test('Deberia devolver un 404 porque el cliente con ese documento no esta en la base de datos', async () => {
    const response = await api.get(ENPOINT + '/document-number/789456123')
    const { status, body: { errors } } = response

    expect(status).toBe(404)
    expect(errors.includes(labels.errors.response.notFound)).toBe(true)
  })

  test('Deberia devolver un 404 porque el cliente con ese numero de documento esta eliminado', async () => {
    const clientFake = getClientFake(1, 1, 1, 1, 1)
    const clientSaved = await ClientDao.createClient(clientFake)
    await ClientDao.deleteClientById(clientSaved._id)

    const response = await api.get(ENPOINT + '/document-number/' + clientSaved.document.number)
    const { status, body: { errors } } = response

    expect(status).toBe(404)
    expect(errors.includes(labels.errors.response.notFound)).toBe(true)
  })

  test('Deberia devolver un 400 porque el numero de documento debe tener entre 8 y 15 caracteres', async () => {
    const clientFake = getClientFake(1, 1, 1, 1, 1)
    const clientSaved = await ClientDao.createClient(clientFake)
    const response = await api.get(ENPOINT + '/document-number/' + clientSaved.document.number)
    const { status, body: { data } } = response

    expect(status).toBe(200)
    expect(data.name).toEqual(clientFake.name)
    expect(data.document.number).toEqual(clientSaved.document.number)
  })
})

// describe('/GET/?name filter clients by name', () => {
//   test('Deberia devolver un 200', async () => {
//     const clientFakeOne = getClientFake(1, 1, 1, 1)
//     const clientFakeTwo = getClientFake(1, 1, 1, 1)
//     const clientFakeThree = getClientFake(1, 1, 1, 1)
//     const clientFakeFour = getClientFake(1, 1, 1, 1)
//     const clientFakeFive = getClientFake(1, 1, 1, 1)
//     const clientFakeSix = getClientFake(1, 1, 1, 1)

//     await ClientDao.createClient(clientFakeOne)
//     await ClientDao.createClient(clientFakeTwo)
//     await ClientDao.createClient(clientFakeThree)
//     await ClientDao.createClient(clientFakeFour)
//     await ClientDao.createClient(clientFakeFive)
//     await ClientDao.createClient(clientFakeSix)

//     const response = await api.get(ENPOINT).query({ name: clientFakeOne.name })
//     const { status, body: { info, clients } } = response

//     expect(status).toBe(200)
//     expect(info.totalDocs).toBe(6)
//   })
// })

describe('/POST create client', () => {
  test('Deberia devolver un 201 con el cliente creado', async () => {
    const clientFake = getClientFake(1, 1, 1, 1, 1)
    const clientFakeTwo = getClientFake(1, 1, 1, 1, 1)
    // save client
    await ClientDao.createClient(clientFake)

    const response = await api.post(ENPOINT).send(clientFakeTwo)
    const { status, body: { code, data } } = response

    expect(status).toBe(201)
    expect(code).toBe(201)
    expect(data.name).toBe(clientFakeTwo.name)
    expect(data.lastname).toBe(clientFakeTwo.lastname)
    expect(data.email).toBe(clientFakeTwo.email)
    expect(data.company).toEqual(clientFakeTwo.company)
  })
})

describe('/PATCH update client', () => {
  test('Deberia devolver un 400 porque el id es de formato incorrecto', async () => {
    const response = await api.patch(ENPOINT + '/sd13')
    const { status, body: { code, errors } } = response

    expect(status).toBe(400)
    expect(code).toBe(400)
    expect(errors.includes(labels.errors.response.badId))
  })

  test('Deberia devolver un 404 porque no se encontro el cliente', async () => {
    const response = await api.patch(ENPOINT + '/101')
    const { status, body: { code, errors } } = response

    expect(status).toBe(404)
    expect(code).toBe(404)
    expect(errors.includes(labels.errors.response.notFound))
  })

  test('Deberia devolver un 404 porque se intento actualizar un cliente eliminado', async () => {
    const clientFake = getClientFake(1, 1, 1, 1, 1)
    const clientSaved = await ClientDao.createClient(clientFake)
    await ClientDao.deleteClientById(clientSaved._id)

    const response = await api.patch(ENPOINT + '/' + clientSaved._id)
    const { status, body: { code, errors } } = response

    expect(status).toBe(404)
    expect(code).toBe(404)
    expect(errors.includes(labels.errors.response.notFound))
  })

  test('Deberia devolver un 200 con un cliente actualizado', async () => {
    const clientFake = getClientFake(1, 1, 1, 1, 1)
    // save clients
    const client = await ClientDao.createClient(clientFake)
    const clientFakeUpdated = getClientFake(1, 1, 1, 1, 1)

    const response = await api.patch(ENPOINT + '/' + client._id).send(clientFakeUpdated)
    const { status, body: { code, data } } = response

    expect(status).toBe(200)
    expect(code).toBe(200)
    expect(data.name).toBe(clientFakeUpdated.name)
    expect(data.lastname).toBe(clientFakeUpdated.lastname)
    expect(data.email).toBe(clientFakeUpdated.email)
  })
})

describe('/DELETE/:id remove client by id', () => {
  test('Deberia devolver un 400 porque el id es de formato incorrecto', async () => {
    const response = await api.delete(ENPOINT + '/sd13')
    const { status, body: { code, errors } } = response

    expect(status).toBe(400)
    expect(code).toBe(400)
    expect(errors.includes(labels.errors.response.badId))
  })

  test('Deberia devolver un 404 porque no se encontro el cliente', async () => {
    const response = await api.delete(ENPOINT + '/101')
    const { status, body: { code, errors } } = response

    expect(status).toBe(404)
    expect(code).toBe(404)
    expect(errors.includes(labels.errors.response.notFound))
  })

  test('Deberia devolver un 200 con un cliente', async () => {
    const clientFake = getClientFake(1, 1, 1, 1, 1)
    // save clients
    const client = await ClientDao.createClient(clientFake)

    const response = await api.delete(ENPOINT + '/' + client._id)
    const { status, body: { code, message } } = response

    expect(status).toBe(200)
    expect(code).toBe(200)
    expect(message).toBe(labels.success.response.deleted)

    const clientFound = await ClientDao.findById(client._id)
    expect(clientFound).toBe(null)
  })
})
