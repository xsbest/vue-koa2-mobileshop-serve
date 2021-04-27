const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')
const db = 'mongodb://localhost/my-db'

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}

exports.connect = () => {
  //链接数据库
  mongoose.connect(db)

  let maxTimes = 0

  return new Promise((res, rej) => {
    //断开连接
    mongoose.connection.on('disconnected', (err) => {
      console.log('数据库断开·························')
      if (maxTimes <= 3) {
        maxTimes++
        mongoose.connect(db)
      } else {
        rej(err)
        throw new Error('数据库出现问题，请人为查询问题')
      }
    })

    //链接错误
    mongoose.connection.on('error', () => {
      console.log('数据库错误·························')
      mongoose.connect(db)
    })

    //链接成功
    mongoose.connection.on('open', () => {
      console.log('数据库连接成功·························')
      res()
    })
  })
}
