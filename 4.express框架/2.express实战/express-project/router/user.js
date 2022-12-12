
const express = require('express')
const router = express.Router()
const userController = require('../controller/user')

const validator = require('../middleware/validator/userValidator')


router
  .post('/registers', validator.register, userController.register)
  .post('/login', validator.login, userController.login)
  .get('/lists', userController.list)



module.exports = router