const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  console.log('one-1');
  next()
  console.log('one-2');
})

app.use(async (ctx, next) => {
  await console.log('two-1');
  next()
  await console.log('two-2');
})

app.use(async (ctx, next) => {
  console.log('three-1');
  next()
  console.log('three-2');
})


app.listen(2077, () => {
  console.log('http://127.0.0.1:2077');
}) 