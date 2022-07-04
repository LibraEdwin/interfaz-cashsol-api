// @ts-check
import { model, Schema } from 'mongoose'
import Paginate from 'mongoose-paginate-v2'
import MongooseDelete from 'mongoose-delete'

const UserSchema = new Schema(
  {
    _id: Number,
    nickname: {
      type: String,
      unique: true,
      required: [true, 'nickname required']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'email required']
    },
    password: {
      type: String,
      required: [true, 'password required']
    }
  },
  { timestamps: true, versionKey: false }
)

UserSchema.plugin(MongooseDelete, {
  overrideMethods: true
})

UserSchema.plugin(Paginate)

const UserModel = model('User', UserSchema)

export default UserModel
