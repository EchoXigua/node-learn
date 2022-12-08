const fs = require('fs')
const url = require('url')
const controller = require('./controller')

module.exports = (req, res) => {
  if (req.method == "GET") {
    //get请求获取参数
    //通过内置模块url 来处理请求路径    
    console.log(url.parse(req.url, true));
    if (req.url == '/') {
      controller.index(res)
    } else {
      //读取到的图片是二进制,不需要字符编码
      fs.readFile('./ka.png', (err, data) => {
        //这个地方给end传递参数 相当于先写在断开链接
        res.end(data)
      })
    }
  } else if (req.method == "POST") {
    //监听data事件，客户端时分包发送的，发送一次这个回调就处理一次
    let str = ''
    req.on('data', (data) => {
      str += data
      console.log(data);
    })
    //所以我们得等客户端数据全部发送完成再处理
    res.end('end', () => {
      //querystring 用来处理流数据
      let result = require('querystring').parse(str)
      // console.log(result);  //[Object: null prototype] { username: 'as', age: '123' }
      //处理逻辑
      controller.user(result, res)
    })
  }
}