// @ts-check
import labels from './labels'
import { checkSchema, param, validationResult } from 'express-validator'

const validateIdParam = param('id')
  .isNumeric()
  .withMessage(labels.errors.response.badId)
  .customSanitizer(value => {
    return Math.abs(Number(value))
  })

const validateDocumentNumberParam = param('number')
  .isNumeric()
  .withMessage(labels.errors.response.badDocumentNumber)
  .isLength({ min: 8, max: 15 })
  .withMessage(labels.errors.response.badLengthDocumentNumber)
  .customSanitizer(value => {
    return Math.abs(Number(value))
  })

const resultsValidator = validationResult.withDefaults({
  formatter: error => {
    return error.msg
  }
})
const hasErrors = async (req, res, next) => {
  const errors = resultsValidator(req).array()

  if (errors.length > 0) {
    return res.failValidationError({ errors })
  }

  next()
}
export default {
  hasErrors,
  validateIdParam,
  validateDocumentNumberParam
}
