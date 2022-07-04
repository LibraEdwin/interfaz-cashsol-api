// @ts-check
import { Router } from 'express'
import * as DistrictController from './controller'

const router = Router()

router.get('/', DistrictController.index)
router.get('/:id', DistrictController.getById)
router.get('/province/:id', DistrictController.getByProvince)

export default router
