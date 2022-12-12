const { validationResult } = require('express-validator')

//所有错误验证规则的统一处理
module.exports = validator => {
  return async (req, res, next) => {
    await Promise.all(validator.map(item => item.run(req)))
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(401).json({ error: errors.array() })
    }
    next()
  }
}

