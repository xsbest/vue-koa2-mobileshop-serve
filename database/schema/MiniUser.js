const mongoose = require('mongoose')

const Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId //主键

const exercisesSchema = new Schema({
  date: String,
  sportType: String, // 0 | 1 | 2 | 3   跑步 | 瑜伽 | 跳绳 | HIIT
  sportTime: String,
  cal: String,
})

//创建UserSchema
const miniUserSchema = new Schema(
  {
    userId: { type: ObjectId },

    userName: { unique: true, type: String }, //不重复的

    weight: String,

    height: String,

    age: String,

    exercisesHistory: [exercisesSchema],
  },
  { collection: 'MiniUser' }
)
//发布模型
mongoose.model('MiniUser', miniUserSchema)
