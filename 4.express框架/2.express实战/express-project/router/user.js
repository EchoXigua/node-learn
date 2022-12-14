
const express = require('express')
const router = express.Router()
const userController = require('../controller/user')

const validator = require('../middleware/validator/userValidator')

const { verifyToken } = require('../util/jwt')

//文件上传
const multer = require('multer')
/**
 * dest 服务器地址
 */
const upload = multer({ dest: 'public/' })



router
  //关注
  .get('/unsubscribe/:userId', verifyToken(), userController.unsubscribe)
  .get('/subscribe/:userId', verifyToken(), userController.subscribe)
  .post('/registers', validator.register, userController.register)
  .post('/login', validator.login, userController.login)
  .put('/', verifyToken(), validator.update, userController.update)
  .post('/headimg', verifyToken(), upload.single('headimg'), userController.headImg)
  .get('/lists', verifyToken(), userController.list)



module.exports = router