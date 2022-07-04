import { Types } from 'mongoose'

export type ProductCategory = {
  _id: Types.ObjectId
  name: string
  loanTypeID: number
  minInterest: number
  maxInterest: number
}

export { CustomResponse as Response } from '../../helpers/types'