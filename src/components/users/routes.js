// @ts-check
import { Router } from 'express'
import * as UserController from './controller'
import { authBasic } from 'middlewares/auth/strategies'

const router = Router()

router.post('/', UserController.create)
router.get('/', UserController.index)
router.get('/:id', UserController.getById)
router.patch('/:id', UserController.updateById)
router.delete('/:id', UserController.removeById)
router.post('/login', authBasic, UserController.loginUser)
router.post('/logout', UserController.logoutUser)

export default router
