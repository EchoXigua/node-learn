
const express = require('express')
const router = express.Router()
const userController = require('../controller/user')

const validator = require('../middleware/validator/userValidator')


router
  .post('/register',
    validator.register,
    userController.register)
  .get('/list', userController.list)



module.exports = router