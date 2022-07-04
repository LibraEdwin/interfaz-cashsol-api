// @ts-check
import { model, Schema } from 'mongoose'
import Paginate from 'mongoose-paginate-v2'
import MongooseDelete from 'mongoose-delete'

const PositionSchema = new Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: [true, 'name required']
    }
  },
  { timestamps: true, versionKey: false }
)

PositionSchema.plugin(MongooseDelete, {
  overrideMethods: true
})

PositionSchema.plugin(Paginate)

const PositionModel = model('Position', PositionSchema)

export default PositionModel
