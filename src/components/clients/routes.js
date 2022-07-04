import { Router } from 'express'
import ClientController from './controller'
import ClientService from './services'
import { authBasic } from 'middlewares/auth/strategies'

const router = Router()

router.get('/', ClientController.index)

router.get('/document-number/:number',
  ClientService.validateDocumentNumberParam,
  ClientService.hasErrors,
  ClientController.getByDocumentNumber
)

router.get('/:id',
  ClientService.validateIdParam,
  ClientService.hasErrors,
  ClientController.getById
)

router.post('/', ClientController.create)

router.post('/sign-in', authBasic, ClientController.signIn)

router.post('/sign-out', ClientController.signOut)

router.patch('/:id',
  ClientService.validateIdParam,
  ClientService.hasErrors,
  ClientController.updateById
)

router.delete('/:id',
  ClientService.validateIdParam,
  ClientService.hasErrors,
  ClientController.removeById
)

export default router
