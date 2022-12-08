const http = require('http')
const fs = require('fs')

//1.创建服务器
//获取到服务器的实例对象
const server = http.createServer()
server.listen(8080, () => {
  console.log('服务器启动成功http://127.0.0.1:8080');
})

//监听客户端的请求
server.on('request', (req, res) => {
  //req 请求对象  res  相应对象
  // console.log('有人请求了');
  //设置响应头，告诉客户端返回的数据类型是什么
  /**
   * text 纯文本信息
   * charset 显示的字符编码 utf-8
   */
  // res.setHeader('Content-type', 'text/plain;charset=utf-8')

  //告诉客户端返回的是html
  // res.setHeader('Content-type', 'text/html;charset=utf-8')
  // res.write('<h1>给你~<h1>')
  // res.end()

  //当返回的html文件中有图片资源，客户端会再发一次对图片的请求，
  //但是这里并没有对图片进行处理，依旧返回html内容，所以客户端加载不了图片
  //所以这里对请求简单处理一下，来满足返回不同的内容
  if (req.url == '/') {
    fs.readFile('./index.html', 'utf8', (err, data) => {
      if (!err) {
        res.write(data)
        res.end()
      }
    })
  } else {
    //读取到的图片是二进制,不需要字符编码
    fs.readFile('./ka.png', (err, data) => {
      //这个地方给end传递参数 相当于先写在断开链接
      res.end(data)
    })
  }


  //想返回一个完整结构的html
})

