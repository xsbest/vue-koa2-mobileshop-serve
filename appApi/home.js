const Router = require('koa-router')

let router = new Router()
router.get('/', async (ctx) => {
  ctx.body = "用户操作首页"
})
router.post('/register', async (ctx) => {
  console.log(ctx.request.body);
  ctx.body = "用户注册接口"
})

module.exports = router