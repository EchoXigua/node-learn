const Router = require('@koa/router')
//路由前缀/api/v1
const router = new Router({ prefix: '/api/v1' })


router.get('/user/:id', (ctx) => {
  // console.log(ctx.query);
  console.log(ctx.params.id);
  ctx.body = 'hello user'
})
router.post('/user', ctx => {
  console.log(ctx.request.body);
})

router.get('/video', (ctx) => {
  ctx.body = 'video'
})

module.exports = router