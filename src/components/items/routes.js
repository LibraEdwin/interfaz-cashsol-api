// @ts-check
import { Router } from 'express'
import ItemController from './controller'
import ItemService from './services'

const router = Router()

router.get('/', ItemController.index)

router.get('/:id',
  ItemService.validateIdParam,
  ItemService.hasErrors,
  ItemController.getById
)

router.post('/',
  ItemService.validateItem,
  ItemService.hasErrors,
  ItemController.create
)

router.patch('/:id',
  ItemService.validateIdParam,
  ItemService.validateEditedItem,
  ItemService.hasErrors,
  ItemController.updateById
)

router.delete('/:id',
  ItemService.validateIdParam,
  ItemService.hasErrors,
  ItemController.deleteById
)

export default router
