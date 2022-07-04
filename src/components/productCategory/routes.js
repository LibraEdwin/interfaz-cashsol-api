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
  check('loanTypeID', labels.errors.validation.notEmpty.loanTypeID).notEmpty(),
  check('loanTypeID', labels.errors.validation.isNumeric.loanTypeID).isNumeric(),
  check('minInterest', labels.errors.validation.notEmpty.minInterest).notEmpty(),
  check('minInterest', labels.errors.validation.isNumeric.minInterest).isNumeric(),
  check('maxInterest', labels.errors.validation.notEmpty.maxInterest).notEmpty(),
  check('maxInterest', labels.errors.validation.isNumeric.maxInterest).isNumeric(),
  validateFields
], create)
router.patch('/:id', [
  check('name', labels.errors.validation.notEmpty.nombre).notEmpty(),
  check('loanTypeID', labels.errors.validation.notEmpty.loanTypeID).notEmpty(),
  check('loanTypeID', labels.errors.validation.isNumeric.loanTypeID).isNumeric(),
  check('minInterest', labels.errors.validation.notEmpty.minInterest).notEmpty(),
  check('minInterest', labels.errors.validation.isNumeric.minInterest).isNumeric(),
  check('maxInterest', labels.errors.validation.notEmpty.maxInterest).notEmpty(),
  check('maxInterest', labels.errors.validation.isNumeric.maxInterest).isNumeric(),
  validateFields
], updateById)
router.delete('/:id', removeById)

export default router
