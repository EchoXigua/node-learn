const jwt = require('jsonwebtoken')
const { userInfo } = require('os')

const { promisify } = require('util')
const tojwt = promisify(jwt.sign)
const verify = promisify(jwt.verify)

const { uuid } = require('../config/config.default')

module.exports.createToken = async (userInfo) => {
  return await tojwt(
    { userInfo },
    uuid,
    { expiresIn: 60 * 60 * 24 } //过期时间 60s * 60s *24= 1h *24 
  )
}

module.exports.verifyToken = async (req, res, next) => {
  let token = req.headers.authorization
  token = token ? token.split('Bearer ')[1] : null
  if (!token) {
    res.status(402).json({ error: '请传入token' })
  }
  try {
    let userInfo = await verify(token, uuid)
    req.user = userInfo
    next()
  } catch (error) {
    res.status(402).json({ error: '无效的token' })
  }
}
