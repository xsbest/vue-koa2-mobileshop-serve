const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')

//**注册接口 */
router.post('/insertUserData', async (ctx) => {
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

module.exports = router
