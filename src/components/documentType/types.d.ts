import { Types } from 'mongoose'

export type User = {
  _id: Types.ObjectId
  name: string
}

export { CustomResponse as Response } from '../../helpers/types'