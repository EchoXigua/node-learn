const Router = require('@koa/router')
const router = new Router({ prefix: '/api/v1' })

const userController = require('../controller/userController')

router.get('/user/:userId', userController.index)

module.exports = router
