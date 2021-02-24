const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')

//**加载商品信息  */
router.get('/insertAllGoodsInfo', async (ctx) => {
  fs.readFile('./data_json/goods.json', 'utf-8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const Goods = mongoose.model('Goods')
    data.map(val => {
      console.log(val);
      let newGoods = new Goods(val)
      newGoods.save().then(() => {
        saveCount++
        console.log("插入成功" + saveCount);
      }).catch(err => {
        console.log(err);
      })
    })
  })
  ctx.body = "开始导入数据"
})

//**加载商品大类信息  */
router.get('/insertAllCategory', async (ctx) => {
  fs.readFile('./data_json/category.json', async (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const Category = mongoose.model('Category')
    data.RECORDS.map((val) => {
      console.log(val);
      let newCategory = new Category(val)
      newCategory.save().then(() => {
        saveCount++;
        console.log("成功" + saveCount);
      }).catch((err) => {
        console.log("失败", err);
      })
    })
  })
  ctx.body = "开始导入数据"
})

//**加载商品子类信息  */
router.get('/insertAllCategorySub', async (ctx) => {
  fs.readFile('./data_json/category_sub.json', 'utf-8', (err, data) => {
    data = JSON.parse(data)
    const CategorySub = mongoose.model('CategorySub')
    let saveCount = 0
    data.RECORDS.map((val) => {
      console.log(val);
      let newCategorySub = new CategorySub(val)
      newCategorySub.save().then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch(err => {
        console.log('失败', err);
      })
    })
  })
  ctx.body = "开始导入数据"
})

//** 获取商品详情信息接口 */
router.post('/getDetailGoodsInfo', async (ctx) => {
  try {
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    let res = await Goods.findOne({
      ID: goodsId
    }).exec()
    ctx.body = {
      code: 200,
      msg: res
    }
  } catch {
    ctx.body = {
      code: 500,
      msg: err
    }
  }
})

module.exports = router;