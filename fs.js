const fs = require('fs')

fs.readFile('./data_json/goods.json', 'utf-8', function (err, data) {
  let newData = JSON.parse(data)
  let pushData = []
  let i = 0
  newData.RECORDS.map((val) => {
    if (val.IMAGE1 != null) {
      i++
      console.log(val.NAME, i);
      pushData.push(val)
    }
  })
  fs.writeFile('./data_json/goods.json', JSON.stringify(pushData), (err) => {
    if (err) {
      console.log('写入文件失败');
    }
    else {
      console.log("写入文件成功");
    }
  })
})