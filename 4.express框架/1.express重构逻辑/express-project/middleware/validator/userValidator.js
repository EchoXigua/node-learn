const { body } = require('express-validator')
const validator = require('./errorBack')
module.exports.register =
  validator([
    body('username')
      .notEmpty().withMessage('用户名不能为空').bail() //bail 匹配成功后中断，不继续匹配了
      .isLength({ min: 3 }).withMessage('用户名长度不能小于3'),
    body('email')
      .notEmpty().withMessage('邮箱不能为空')
      .isEmail(),
  ])




