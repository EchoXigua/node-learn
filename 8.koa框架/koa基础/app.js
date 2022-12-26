const Koa = require('koa')
const app = new Koa()
const router = require('./router')
const { koaBody } = require('koa-body')

app.use(koaBody())
app.use(router.routes())

// app.use(async (ctx, next) => {
//   console.log('one-1');
//   if (ctx.path == '/user') {

//   } else if (ctx.path == '/video') {

//   }
// })

app.on('error', (err, ctx) => {
  console.log(err);
  ctx.body = err
})


app.listen(2077, () => {
  console.log('http://127.0.0.1:2077');
}) 