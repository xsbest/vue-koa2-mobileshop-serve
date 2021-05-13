const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')

//**注册接口 */
router.post('/register', async (ctx) => {
  try {
    const User = mongoose.model('MiniUser')
    let newUser = new User(ctx.request.body)
    let res = await newUser.save()
    ctx.body = {
      code: 200,
      msg: res,
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      msg: err,
    }
    console.log(err)
  }
})

//**新增运动记录接口 */
router.post('/addUserData', async (ctx) => {
  try {
    const User = mongoose.model('MiniUser')
    let one = await User.findOne({
      userName: ctx.request.body.userName,
    }).exec()
    one.exercisesHistory.push(ctx.request.body.exercise)
    const res = await User.updateOne(
      { userName: ctx.request.body.userName },
      one
    )
    ctx.body = {
      code: 200,
      msg: res,
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      msg: err,
    }
    console.log(err)
  }
})

//**编辑接口 */
router.post('/editUserData', async (ctx) => {
  try {
    const User = mongoose.model('MiniUser')
    const { weight, height, age, userName } = ctx.request.body
    const res = await User.updateOne(
      { userName: userName },
      { weight: weight, height: height, age: age }
    )
    ctx.body = {
      code: 200,
      msg: res,
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      msg: err,
    }
    console.log(err)
  }
})

//**查询运动记录接口 */
router.post('/getUserData', async (ctx) => {
  try {
    const User = mongoose.model('MiniUser')
    let res = await User.findOne({
      userName: ctx.request.body.userName,
    }).exec()
    if (res.length === 0) {
      ctx.body = {
        code: -1,
        msg: '该用户未注册！',
      }
    } else {
      ctx.body = {
        code: 200,
        msg: '登录成功！',
        list: res,
      }
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      msg: err,
    }
    console.log(err)
  }
})
module.exports = router
