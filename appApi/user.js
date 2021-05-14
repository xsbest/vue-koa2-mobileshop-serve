const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()
router.get('/', async (ctx) => {
  ctx.body = "用户操作首页"
})

//注册
router.post('/register', async (ctx) => {
  const User = mongoose.model('User')
  let newUser = new User(ctx.request.body)

  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      msg: '注册成功'
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      msg: err
    }
  })
})

//登录
router.post('/login', async (ctx) => {
  let loginUser = ctx.request.body
  // console.log(loginUser);
  let userName = loginUser.userName
  let password = loginUser.password

  //引入model
  const User = mongoose.model('User')
  await User.findOne({ userName: userName }).exec()
    .then(async (res) => {
      if (res) {
        let newUser = new User()
        await newUser.comparePassword(password, res.password)
          .then((isMatch) => {
            ctx.body = { code: 200, msg: isMatch }
            console.log('登录成功');
          })
          .catch((err) => {
            ctx.body = { code: 500, msg: err }
            console.log('密码错误');

          })
      } else {
        ctx.body = { code: 500, msg: "用户名不存在" }
        console.log('用户名不存在');
      }
    })
    .catch((err) => {
      ctx.body = { code: 500, msg: err }
    })

})

module.exports = router