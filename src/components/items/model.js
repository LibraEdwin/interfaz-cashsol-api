// @ts-check
import { model, Schema } from 'mongoose'
import Paginate from 'mongoose-paginate-v2'
import MongooseDelete from 'mongoose-delete'

const ItemSchema = new Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: [true, 'name is required']
    }
  },
  { timestamps: true, versionKey: false }
)

ItemSchema.plugin(MongooseDelete, {
  overrideMethods: true
})

ItemSchema.plugin(Paginate)

const ItemModel = model('Item', ItemSchema)

export default ItemModel
