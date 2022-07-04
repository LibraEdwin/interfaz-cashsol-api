// @ts-check
import { Router } from 'express'
import { create, index, removeById, updateById } from './controller'
import { check } from 'express-validator'
import labels from './labels'
import { validateFields } from './services'

const router = Router()

router.get('/', index)
router.post('/', [
  check('name', labels.errors.validation.notEmpty.nombre).notEmpty(),
  validateFields
], create)
router.patch('/:id', [
  check('name', labels.errors.validation.notEmpty.nombre).notEmpty(),
  validateFields
], updateById)
router.delete('/:id', removeById)

export default router
