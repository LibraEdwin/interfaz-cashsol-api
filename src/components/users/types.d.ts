import { Types } from 'mongoose'

export type User = {
  _id: Number
  nickname: String
  email: String
  password: string
}

export { CustomResponse as Response } from '../../helpers/types'