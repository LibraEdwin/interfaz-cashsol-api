import { Types } from 'mongoose'

export type Product = {
  _id: Types.ObjectId
  name: string
  category: string
}

export { CustomResponse as Response } from '../../helpers/types'