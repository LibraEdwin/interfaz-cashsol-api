// @ts-check
import { Router } from 'express'
import * as ProfessionController from './controller'

const router = Router()

router.post('/', ProfessionController.create)
router.get('/', ProfessionController.index)
router.get('/:id', ProfessionController.getById)
router.patch('/:id', ProfessionController.updateById)
router.delete('/:id', ProfessionController.removeById)

export default router
