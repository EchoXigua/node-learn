const http = require('http')
const fs = require('fs')
const url = require('url')

const router = require('./router')
//1.创建服务器
//获取到服务器的实例对象
const server = http.createServer()
server.listen(8080, () => {
  console.log('服务器启动成功http://127.0.0.1:8080');
})


//模块化拆分

//监听客户端的请求
server.on('request', (req, res) => {
  console.log(req.method);
  router(req, res)
})

