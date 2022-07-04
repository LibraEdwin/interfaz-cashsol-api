// @ts-check
import { model, Schema } from 'mongoose'
import Paginate from 'mongoose-paginate-v2'
import MongooseDelete from 'mongoose-delete'

const LoanTypeSchema = new Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: [true, 'name required']
    }
  },
  { timestamps: true, versionKey: false }
)

LoanTypeSchema.plugin(MongooseDelete, {
  overrideMethods: true
})

LoanTypeSchema.plugin(Paginate)

const LoanTypeModel = model('LoanType', LoanTypeSchema)

export default LoanTypeModel
