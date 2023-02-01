const { User, Subscribe } = require('../model')
const { createToken } = require('../utils/jwt')

module.exports.index = async (ctx, next) => {
  console.log('params', ctx.params.userId);
  const user = await User.findById(ctx.params.userId)
  ctx.body = user
}


exports.subscribeList = async ctx => {
  //我的关注列表
  const userId = ctx.user.userInfo._id
  const subList = await Subscribe.find({ user: userId })
    .populate('channel', ['username', 'image', 'channeldes', 'subscribeCount'])
  ctx.body = subList
}


//关注频道
exports.subscribe = async ctx => {
  //拿到要关注的人
  const subscribeId = ctx.request.params.subscribeId
  const userId = ctx.user.userInfo._id
  if (subscribeId == userId) {
    return ctx.throw(403, '不能关注自己')
  }

  const subInfo = await Subscribe.findOne({
    user: userId,
    channel: subscribeId
  })

  if (subInfo) {
    return ctx.throw(403, '已经关注了')
  }
  const sub = new Subscribe({
    user: userId,
    channel: subscribeId
  })
  const subDb = await sub.save()
  if (subDb) {
    //关注成功后 将需要关注人的一些信息返回
    const subscribeUser = await User.findById(subscribeId, ['username', 'image', 'cover', 'channeldes', 'subscribeCount'])
    //关注者的粉丝+1
    subscribeUser.subscribeCount++
    await subscribeUser.save()
    ctx.body = subscribeUser
  } else {
    ctx.throw(501, '关注失败')
  }
}



//获取用户信息
exports.getUser = async ctx => {
  const userId = ctx.request.params.userId

  // 获取登录信息，可以查看该用户是否关注要查询的用户
  const registerUserId = ctx.user.userInfo?._id
  let isSubcribed = false
  if (registerUserId) {
    const subscribe = await Subscribe.findOne({
      user: registerUserId,
      channel: userId
    })

    if (subscribe) {
      //说明关注过了
      isSubcribed = true
    }
  }

  const userInfoDb = await User.findById(userId, ['username', 'image', 'cover', 'channeldes'])
  const userInfo = userInfoDb._doc
  userInfo.isSubcribed = isSubcribed
  ctx.body = userInfo
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