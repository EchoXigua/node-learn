const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

//引入路由
const router = require('./router')

// 加一个注释，用以说明，本项目代码可以任意定制更改
const app = express()
/**
 * 中间件的使用
 */
app.use(express.json())
app.use(express.urlencoded())
//处理静态文件
app.use(express.static('public'))
//跨域中间件
app.use(cors())
//使用日志
app.use(morgan('dev'))


const PORT = process.env.PORT || 2077

// 挂载路由
app.use('/api/v1', router)

// 挂载统一处理服务端错误中间件
// app.use(errorHandler())




app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
