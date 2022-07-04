// @ts-check
import { model, Schema } from 'mongoose'
import Paginate from 'mongoose-paginate-v2'
import MongooseDelete from 'mongoose-delete'

const ProductCategorySchema = new Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: [true, 'name required']
    },
    loanTypeID: {
      type: Number,
      ref: 'LoanType'
    },
    minInterest: {
      type: Number
    },
    maxInterest: {
      type: Number
    }
  },
  { timestamps: true, versionKey: false }
)

ProductCategorySchema.plugin(MongooseDelete, {
  overrideMethods: true
})

ProductCategorySchema.plugin(Paginate)

const ProductCategoryModel = model('ProductCategory', ProductCategorySchema)

export default ProductCategoryModel
