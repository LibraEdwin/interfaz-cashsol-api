// @ts-check
import { model, Schema } from 'mongoose'
import Paginate from 'mongoose-paginate-v2'
import MongooseDelete from 'mongoose-delete'

const DocumentTypeSchema = new Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: [true, 'name required']
    }
  },
  { timestamps: true, versionKey: false }
)

DocumentTypeSchema.plugin(MongooseDelete, {
  overrideMethods: true
})

DocumentTypeSchema.plugin(Paginate)

const DocumentTypeModel = model('DocumentType', DocumentTypeSchema)

export default DocumentTypeModel
