const { User } = require('../model')
const { createToken } = require('../utils/jwt')

module.exports.index = async (ctx, next) => {
  console.log('params', ctx.params.userId);
  const user = await User.findById(ctx.params.userId)
  ctx.body = user
}

//获取用户信息
exports.getUser = async ctx => {
  ctx.body = ctx.user
}


exports.register = async ctx => {
  const userModel = new User(ctx.request.body)
  const dbBack = await userModel.save()
  ctx.body = dbBack
}

exports.login = async ctx => {
  const dbBack = await User.findOne(ctx.request.body)
  if (!dbBack) {
    return ctx.throw(402, '邮箱或者密码不正确')
  }
  //生成token
  const token = await createToken(dbBack._doc)
  dbBack._doc.token = token
  ctx.body = dbBack._doc
}