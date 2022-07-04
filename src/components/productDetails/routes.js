import { Router } from 'express'
import ProductDetailController from './controller'
import ProductDetailServices from './services'

const router = Router()

router.get('/', ProductDetailController.index)

router.get('/:id',
  ProductDetailServices.validateIdParam,
  ProductDetailServices.hasErrors,
  ProductDetailController.getById)

router.post('/',
  ProductDetailServices.validateImage,
  ProductDetailController.create)

router.patch('/:id',
  ProductDetailServices.validateIdParam,
  ProductDetailServices.validateImage,
  ProductDetailServices.hasErrors,
  ProductDetailController.updateById)

router.patch('/deliver-product/:id',
  ProductDetailServices.validateIdParam,
  ProductDetailServices.hasErrors,
  ProductDetailController.deliverProduct
)

router.delete('/:id',
  ProductDetailServices.validateIdParam,
  ProductDetailServices.hasErrors,
  ProductDetailController.removeById)

export default router
