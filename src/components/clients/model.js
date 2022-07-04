// @ts-check
import { model, Schema } from 'mongoose'
import Paginate from 'mongoose-paginate-v2'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'
import MongooseDelete from 'mongoose-delete'

export const MARITAL_STATUS_ENUM = ['soltero', 'casado', 'divorciado', 'viudo']

export const EMPLOYEE_STATUS_ENUM = ['dependiente', 'independiente']

// {
//   type: String,
//   uppercase: true
// },

/**
 * @tutorial Paginate-Plugin Plugin de paginación para mongoose 
 * 
 * 🔸Paso1:   import aggregatePaginate from 'mongoose-aggregate-paginate-v2'
 * 
 * 🔸Paso2:   Agregar plugin al modelo
 * 
 *          ClientSchema.plugin(aggregatePaginate)
 * 
 */


const ClientSchema = new Schema(
  {
    _id: Number,
    name: {
      type: String
    },
    lastname: {
      type: String
    },
    phone: {
      codCountry: Number,
      number: Number
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required']
    },
    password: String,
    profession: {
      type: Number,
      ref: 'Profession'
    },
    maritalStatus: {
      type: String,
      enum: MARITAL_STATUS_ENUM
    },
    employmentStatus: {
      type: String,
      enum: EMPLOYEE_STATUS_ENUM
    },
    addressData: {
      address: String,
      district: {
        type: String,
        ref: 'District'
      }
    },
    document: {
      type: {
        type: Number,
        ref: 'DocumentType'
      },
      number: String
    },
    company: {
      position: {
        type: Number,
        ref: 'Position'
      },
      name: String,
      address: String,
      item: {
        type: Number,
        ref: 'Item'
      }
    },
    bankingEntity: {
      type: Number,
      ref: 'BankingEntity'
    },
    accountNumber: String
  },
  { timestamps: true, versionKey: false }
)

ClientSchema.plugin(MongooseDelete, {
  overrideMethods: true
})

ClientSchema.plugin(Paginate)
ClientSchema.plugin(aggregatePaginate)

const ClientModel = model('Client', ClientSchema)

export default ClientModel
