const fs = require('fs')

//追加内容，而不是覆盖。可以先读取，在拼接，最后写入

fs.readFile('./a.txt', 'utf8', (err, data) => {
  if (!err) {
    //没有错误信息
    let str = data + '  追加的内容'
    fs.writeFile('./a.txt', str, (err) => {
      if (!err) {
        console.log('追加内容成功！');
      }
    })
  }
})