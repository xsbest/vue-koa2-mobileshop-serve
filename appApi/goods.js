const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')
const {
  count
} = require('console')

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

module.exports = router;