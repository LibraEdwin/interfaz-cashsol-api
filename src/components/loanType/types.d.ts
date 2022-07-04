import { Types } from 'mongoose'

export type LoanType = {
  _id: Types.ObjectId
  name: string
}

export { CustomResponse as Response } from '../../helpers/types'