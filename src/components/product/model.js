// @ts-check
import { model, Schema } from 'mongoose'
import Paginate from 'mongoose-paginate-v2'
import MongooseDelete from 'mongoose-delete'

const ProductSchema = new Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: [true, 'name required']
    },
    productCategoryID: {
      type: String,
      ref: 'ProductCategory'
    }
  },
  { timestamps: true, versionKey: false }
)

ProductSchema.plugin(MongooseDelete, {
  overrideMethods: true
})

ProductSchema.plugin(Paginate)

const ProductModel = model('Product', ProductSchema)

export default ProductModel
