const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
  ctx.body = 'hello koa'
  // console.log(ctx.req.url); //请求路径
  // console.log(ctx.req.method); //请求方法
  // console.log(ctx.header);//请求头
})

app.listen(2077, () => {
  console.log('http://127.0.0.1:2077');
}) 