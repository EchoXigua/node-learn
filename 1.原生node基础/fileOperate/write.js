//写入文件

const fs = require('fs')

/**
 * 接受三个参数
 *  1. 文件的路径
 *  2. 想要写入的内容
 *  3. 回调函数
 *    1.err 写入失败的错误信息
 */
fs.writeFile('./a.txt', '覆盖a.txt的内容', (err) => {
  //接受一个参数
  console.log(err);
})