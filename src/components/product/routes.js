// @ts-check
import { Router } from 'express'
import { create, index, removeById, updateById, getByCategory, getById } from './controller'
import { check } from 'express-validator'
import labels from './labels'
import { validateFields } from './services'

const router = Router()

router.get('/', index)
router.get('/:id', getById)
router.get('/category/:id', getByCategory)
router.post('/', [
  check('name', labels.errors.validation.notEmpty.name).notEmpty(),
  check('productCategoryID', labels.errors.validation.notEmpty.productCategoryID).notEmpty(),
  check('productCategoryID', labels.errors.validation.isNumeric.productCategoryID).isNumeric(),
  validateFields
], create)
router.patch('/:id', [
  check('name', labels.errors.validation.notEmpty.name).notEmpty(),
  check('productCategoryID', labels.errors.validation.notEmpty.productCategoryID).notEmpty(),
  check('productCategoryID', labels.errors.validation.isNumeric.productCategoryID).isNumeric(),
  validateFields
], updateById)
router.delete('/:id', removeById)

export default router
