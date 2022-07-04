// @ts-check
import labels from './labels'
import { param, validationResult } from 'express-validator'
import { deleteFileTemp, uploadTempImage } from 'helpers/uploads'
import multer from 'multer'

/**
 * Validar formato y tamaño de la imagen destaca del producto
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 * @param {import('express').NextFunction} next
 */
const validateImage = (req, res, next) => {
  const upload = uploadTempImage.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
  ])

  upload(req, res, err => {
    // errores de multer
    if (err instanceof multer.MulterError) {
      /**
       * El peso de la imagen es basica
       */
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.failValidationError({ errors: [labels.errors.validation.image.limitFileSize] })
      }
    }

    /**
     * Error customizado
     */
    if (err) {
      return res.failValidationError({ errors: err.message })
    }

    next()
  })
}

const validateIdParam = param('id')
  .isNumeric()
  .withMessage(labels.errors.response.badId)
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
    // eliminar la imagen si es que se ha subido alguna
    if (req.file) {
      await deleteFileTemp(req.file.filename)
    }
    return res.failValidationError({ errors })
  }

  next()
}
export default {
  hasErrors,
  validateIdParam,
  validateImage
}
