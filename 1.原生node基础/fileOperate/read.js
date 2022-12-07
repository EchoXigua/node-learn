//读取文件

const fs = require('fs')

/**
 * 接受三个参数
 * 
 *  1. 文件的路径
 *  2. 读取文件的字符编码
 *  3. 回调函数
 *    1.err 读取文件失败的错误信息  没有错误为null
 *    2.data 读取文件成功的结果
 */
fs.readFile('./a.txt', 'utf8', (err, data) => {
  console.log(err);
  console.log(data);
})