const { body } = require('express-validator')
const validator = require('./errorBack')


module.exports.videoValidator =
  validator([
    body('title')
      .notEmpty().withMessage('视频名不能为空').bail() //bail 匹配成功后中断，不继续匹配了
      .isLength({ max: 20 }).withMessage('视频名长度不能大于20'),
    body('vodVideoId')
      .notEmpty().withMessage('vod不能为空').bail()
  ])




