const Koa = require('koa')
const app = new Koa()

const { koaBody } = require('koa-body')
const router = require('./router')
const cors = require('@koa/cors')

app.use(cors())
app.use(koaBody())
app.use(router.routes())

//监听全局的错误
app.on('error', (err, ctx) => {
  console.log(err);
  ctx.body = 'Server error' + err
})

app.listen(2077, () => {
  console.log('127.0.0.1:2077');
})