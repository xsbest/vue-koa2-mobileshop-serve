const mongoose = require('mongoose')

const Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId //主键

const bcrypt = require('bcrypt')

const SAULT_WORK_FACTOR = 10
//创建UserSchema
const userSchema = new Schema({
  UserId: { type: ObjectId }, //主键
  userName: { unique: true, type: String }, //不重复的
  password: String,  //相当于type:String
  creatrAt: { type: Date, default: Date.now() },
  LastLogin: { type: Date, default: Date.now() }
})

//加盐加密
userSchema.pre('save', function (next) {
  bcrypt.genSalt(SAULT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

//发布模型
mongoose.model('User', userSchema)