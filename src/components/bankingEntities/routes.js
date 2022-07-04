// @ts-check
import { Router } from 'express'
import BankingEntityController from './controller'
import BankingEntityService from './services'

const router = Router()

router.get('/', BankingEntityController.index)

router.get('/:id',
  BankingEntityService.validateIdParam,
  BankingEntityService.hasErrors,
  BankingEntityController.getById
)

router.post('/',
  BankingEntityService.validateBankingEntity,
  BankingEntityService.hasErrors,
  BankingEntityController.create
)

router.patch('/:id',
  BankingEntityService.validateIdParam,
  BankingEntityService.validateEditedBankingEntity,
  BankingEntityService.hasErrors,
  BankingEntityController.updateById
)

router.delete('/:id',
  BankingEntityService.validateIdParam,
  BankingEntityService.hasErrors,
  BankingEntityController.deleteById
)

export default router
