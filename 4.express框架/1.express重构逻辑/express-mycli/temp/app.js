const express = require('express')

// 加一个注释，用以说明，本项目代码可以任意定制更改
const app = express()

const PORT = process.env.PORT || 3000

app.use((req, res, next) => {

})

//多个处理函数针对一个路由匹配规则
app.get('/user', (req, res, next) => {
  console.log(req.method);
  next()
}, function (req, res, next) {
  console.log('666');
  next()
})

// 挂载路由
// app.use('/api', router)

// 挂载统一处理服务端错误中间件
// app.use(errorHandler())

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
