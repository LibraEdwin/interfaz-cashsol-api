// @ts-check
import { model, Schema } from 'mongoose'
import Paginate from 'mongoose-paginate-v2'
import MongooseDelete from 'mongoose-delete'

const BankingEntitySchema = new Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: [true, 'name is required']
    }
  },
  { timestamps: true, versionKey: false }
)

BankingEntitySchema.plugin(MongooseDelete, {
  overrideMethods: true
})

BankingEntitySchema.plugin(Paginate)

const BankingEntityModel = model('BankingEntity', BankingEntitySchema)

export default BankingEntityModel
