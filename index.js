const Koa = require('koa')
const Router = require('koa-router')
const fs = require('fs');
const { connect, initSchemas } = require('./database/init.js');
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const app = new Koa();
const cors = require('./koa-cors')
// // 处理跨域
app.use(cors);
// app.use(async (ctx, next) => {
//   ctx.set("Access-Control-Allow-Origin", "*")
//   await next()
// })
const bodyparser = new bodyParser();
app.use(bodyparser)

//装载所有子路由

let user = require('./appApi/user.js')
let home = require('./appApi/home.js')
let goods = require('./appApi/goods.js')

const router = new Router();
router.use('/user', user.routes())
router.use('/home', home.routes())
router.use('/goods', goods.routes())


//加载路由中间件

app.use(router.routes()).use(router.allowedMethods())


  ; (async () => {
    await connect()
    initSchemas()
    // const User = mongoose.model('User')
    // let oneUser = new User({ userName: 'xs3', password: '123456' })
    // oneUser.save().then(() => {
    //   console.log('插入成功');
    // })
    // let user = await User.find({}).exec()
    // console.log(user);
  })()

const render = async (page) => {
  return new Promise((res, rej) => {
    let pageUrl = `./${page}.json`;
    fs.readFile(pageUrl, "utf-8", (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    });
  })
};


router.get('/data', async (ctx) => {
  let data = await render('content')
  ctx.body = data
})

app.use(router.routes())
  .use(router.allowedMethods());



app.listen(3000, () => {
  console.log('服务器已启动····················');
})