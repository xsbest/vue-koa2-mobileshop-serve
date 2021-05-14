const Koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')
const { connect, initSchemas } = require('./database/init.js')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const cors = require('./koa-cors')
const mongoose = require('mongoose')
// // 处理跨域
app.use(cors)
// app.use(async (ctx, next) => {
//   ctx.set("Access-Control-Allow-Origin", "*")
//   await next()
// })
const bodyparser = new bodyParser()
app.use(bodyparser)

//装载所有子路由

let user = require('./appApi/user.js')
let home = require('./appApi/home.js')
let goods = require('./appApi/goods.js')
let miniuser = require('./appApi/miniUser.js')

const router = new Router()
router.use('/user', user.routes())
router.use('/home', home.routes())
router.use('/goods', goods.routes())
router.use('/miniuser', miniuser.routes())

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

    const user = mongoose.model('MiniUser')
    let one = await user.findOne({
      userName: '好名字',
    }).exec()
    one.exercisesHistory = [...one.exercisesHistory, {
      date: '2021年4月29日15:46:11',
      sportType: 'Hiit',
      sportTime: '10秒',
      cal: '0.01',

    },
    {
      date: '2021年4月29日15:23:37',
      sportType: '跑步',
      sportTime: '40秒',
      cal: '0.04',
    },
    {
      date: '2021年4月29日15:11:13',
      sportType: '跑步',
      sportTime: '16秒',
      cal: '0.02',
    },
    {
      date: '2021年4月28日21:28:02',
      sportType: '跳绳',
      sportTime: '20秒',
      cal: '0.08',
    },
    {
      date: '2021年4月28日21:33:21',
      sportType: '瑜伽',
      sportTime: '12秒',
      cal: '0.01',
    },
    {
      date: '2021年4月28日21:40:11',
      sportType: 'Hiit',
      sportTime: '10秒',
      cal: '0.02',
    }]
    const res = await user.updateOne(
      { userName: "好名字" },
      one
    )
    console.log('成功');
  })()

const render = async (page) => {
  return new Promise((res, rej) => {
    let pageUrl = `./${page}.json`
    fs.readFile(pageUrl, 'utf-8', (err, data) => {
      if (err) {
        rej(err)
      } else {
        res(data)
      }
    })
  })
}

router.get('/data', async (ctx) => {
  let data = await render('content')
  ctx.body = data
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('服务器已启动····················')
})
