const mongoose = require('mongoose')

const Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId //主键

const exercisesSchema = new Schema({
  date: Date,
  sportType: Number, // 0 | 1 | 2    跑步 | 快走 | 跳绳
  sportTime: String,
})

//创建UserSchema
const miniUserSchema = new Schema(
  {
    userId: { type: ObjectId },

    userName: { unique: true, type: String }, //不重复的

    weight: String,

    height: String,

    exercisesHistory: [exercisesSchema],
  },
  { collection: 'MiniUser' }
)
//发布模型
mongoose.model('MiniUser', miniUserSchema)
