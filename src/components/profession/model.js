// @ts-check
import { model, Schema } from 'mongoose'
import Paginate from 'mongoose-paginate-v2'
import MongooseDelete from 'mongoose-delete'

const ProfessionSchema = new Schema(
  {
    _id: Number,
    name: {
      type: String
    }
  },
  { timestamps: true, versionKey: false }
)

ProfessionSchema.plugin(MongooseDelete, {
  overrideMethods: true
})

ProfessionSchema.plugin(Paginate)

const ProfessionModel = model('Profession', ProfessionSchema)

export default ProfessionModel
