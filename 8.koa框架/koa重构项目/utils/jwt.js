const jwt = require('jsonwebtoken')

const { promisify } = require('util')

//将jwt 中的sign 方法promise 化
const toJwt = promisify(jwt.sign)

const verify = promisify(jwt.verify)

module.exports.createToken = async userInfo => {
  return await toJwt({ userInfo }, 'koa-xigua', {
    expiresIn: 60 * 60 * 24
  })
}

//验证token  但是有时候我们需要 有些地方可以不用验证token 所以需要柯里化
module.exports.verifyToken = function (required = true) {
  return async (ctx, next) => {
    let token = ctx.headers.authorization
    token = token?.split('Bearer ')[1]
    if (token) {
      try {
        const userInfo = await verify(token, 'koa-xigua')
        ctx.user = userInfo
        await next()
      } catch (error) {
        ctx.throw(402, 'token 验证失败')
      }
    } else if (required) {
      ctx.throw(402, '无效的token')
    } else {
      await next()
    }
  }
}
