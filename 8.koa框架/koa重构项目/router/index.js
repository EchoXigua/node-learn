const Router = require('@koa/router')
const router = new Router({ prefix: '/api/v1' })

const userController = require('../controller/userController')

const { registerValidate, loginValidate, getUser } = require('../middleware/userValidate')
const { verifyToken } = require('../utils/jwt')

// router.get('/user/:userId', userController.index)
router.post('/user/register', registerValidate, userController.register)
router.post('/user/login', loginValidate, userController.login)
router.get('/user/getUser/:userId', verifyToken(false), userController.getUser)
router.get('/user/subscribe/:subscribeId', verifyToken(), userController.subscribe)
router.get('/user/subscribeList', verifyToken(), userController.subscribeList)


module.exports = router
