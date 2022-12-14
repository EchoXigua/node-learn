const { body } = require('express-validator')
const validator = require('./errorBack')

const { User } = require('../../model')

module.exports.register =
  validator([
    body('username')
      .notEmpty().withMessage('用户名不能为空').bail() //bail 匹配成功后中断，不继续匹配了
      .isLength({ min: 3 }).withMessage('用户名长度不能小于3'),
    body('email')
      .notEmpty().withMessage('邮箱不能为空').bail()
      .isEmail().withMessage('邮箱格式不正确').bail()
      .custom(async (val) => {
        const emailValidator = await User.findOne({ email: val })
        if (emailValidator) {
          return Promise.reject('邮箱已被注册')
        }
      }).bail(),
    body('phone')
      .notEmpty().withMessage('手机不能为空').bail()
      .custom(async (val) => {
        const phoneValidator = await User.findOne({ phone: val })
        if (phoneValidator) {
          return Promise.reject('手机已被注册')
        }
      }).bail(),
    body('password')
      .notEmpty().withMessage('密码不能为空').bail()
      .isLength({ min: 6 }).withMessage('密码长度不能小于6').bail()
  ])

module.exports.login = validator([
  body('email')
    .notEmpty().withMessage('邮箱不能为空').bail()
    .isEmail().withMessage('邮箱格式不正确').bail(),
  body('password')
    .notEmpty().withMessage('密码不能为空').bail()
])

module.exports.update = validator([
  body('email')
    // .isEmail().withMessage('邮箱格式不正确').bail()
    .custom(async (val) => {
      const emailValidator = await User.findOne({ email: val })
      if (emailValidator) {
        return Promise.reject('邮箱已被注册')
      }
    }).bail(),
  body('username')
    .custom(async (val) => {
      const nameValidator = await User.findOne({ username: val })
      if (nameValidator) {
        return Promise.reject('用户名已被注册')
      }
    }).bail(),
  body('phone')
    .custom(async (val) => {
      const phoneValidator = await User.findOne({ phone: val })
      if (phoneValidator) {
        return Promise.reject('手机号已被注册')
      }
    }).bail(),
])



