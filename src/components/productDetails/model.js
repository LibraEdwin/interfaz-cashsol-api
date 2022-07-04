import { model, Schema, SchemaTypes } from 'mongoose'
import Paginate from 'mongoose-paginate-v2'
import MongooseDelete from 'mongoose-delete'

const ProductDetailSchema = Schema(
  {
    _id: Number,
    product: {
      type: Number,
      ref: 'Product',
      required: [true, 'El id del producto es requerido']
    },
    client: {
      type: Number,
      ref: 'Client',
      required: [true, 'El id del cliente es requerido']
    },
    appraisedValue: {
      type: SchemaTypes.Decimal128,
      required: [true, 'El valor tasado es requerido']
    },
    productName: {
      type: String,
      required: [true, 'El nombre del producto es requerido']
    },
    year: {
      type: Number,
      default: undefined
    },
    brand: {
      type: String,
      default: undefined
    },
    model: {
      type: String,
      default: undefined
    },
    serie: {
      type: String,
      default: undefined
    },
    features: String,
    observationIntExt: String,
    observationOperation: String,
    receptionDate: {
      type: Date,
      required: [true, 'La fecha de recepción es requerida']
    },
    returnDate: {
      type: Date,
      default: undefined
    }
  },
  { timestamps: true, versionKey: false }
)

ProductDetailSchema.plugin(MongooseDelete, {
  overrideMethods: true
})

ProductDetailSchema.plugin(Paginate)

const ProductDetailModel = model('ProductDetail', ProductDetailSchema)

export default ProductDetailModel
