const { User, Subscribe } = require('../model')
const { createToken } = require('../util/jwt')

const fs = require('fs')
const { promisify } = require('util')
const rename = promisify(fs.rename)

const lodash = require('lodash')

//查看粉丝
exports.getSubscribe = async (req, res) => {
  const subscribeList = await Subscribe.find({ user: req.params.userId })
    .populate('channel')
  subscribeList = subscribeList.map(item => {
    lodash.pick(item.channel, [
      '_id',
      'username',
      'image',
      'subscribeCount',
      'cover',
      'descrition',
    ])
  })
  res.status(200).json(subscribeList)
}

exports.getUser = async (req, res) => {
  let isSubscribe = false

  if (req.user) {
    const record = await Subscribe.findOne({
      channel: req.params.userId,
      user: req.user.userInfo._id
    })
    if (record) {
      isSubscribe = true
    }
  }
  const user = await User.findById(req.params.userId)
  user.isSubscribe = isSubscribe
  res.status(200).json({
    ...lodash.pick(user, [
      "_id",
      "username",
      "image",
      "sbuscribeCount",
    ]),
    isSubscribe
  }

  )
}



//取消关注
exports.unsubscribe = async (req, res) => {
  const userId = req.user.userInfo._id //登录自己的id
  const channelId = req.params.userId //传入的id
  if (userId === channelId) {
    return res.status(401).json({ err: '不能关注自己' })
  }
  const record = await Subscribe.findOne({
    user: userId,
    channel: channelId
  })
  if (record) {
    //查到的数据删除
    await record.remove()

    //粉丝数-1
    const user = await User.findById(channelId)
    user.subscribeCount--
    await user.save() //保存数据
    res.status(200).json(user)
  } else {
    res.status(401).json({ err: '没有关注此用户' })
  }
}

//关注
exports.subscribe = async (req, res) => {
  /**
   * 1. 如果传入的id和 用户id是相同的（自己不能关注自己），则不允许
   */

  const userId = req.user.userInfo._id //登录自己的id
  const channelId = req.params.userId //传入的id
  if (userId === channelId) {
    return res.status(401).json({ err: '不能关注自己' })
  }
  const record = await Subscribe.findOne({
    user: userId,
    channel: channelId
  })
  if (!record) {
    await new Subscribe({
      user: userId,
      channel: channelId
    }).save()

    //粉丝数+1
    const user = await User.findById(channelId)
    user.subscribeCount++
    await user.save() //保存数据
    res.status(200).json({ msg: '关注成功' })
  } else {
    res.status(401).json({ err: '已经关注此用户' })
  }
}

exports.register = async (req, res) => {
  const userModel = new User(req.body)
  const dbBack = await userModel.save()
  const user = dbBack.toJSON()
  delete user.password
  res.status(201).json({
    user
  })
}

exports.login = async (req, res) => {
  // 链接数据库查询
  let dbBack = await User.findOne(req.body)
  if (!dbBack) {
    //结果为空，代表没有查到信息
    res.status(402).json({ error: '邮箱或者密码不正确' })
  }

  dbBack = dbBack.toJSON()
  dbBack.token = await createToken(dbBack)
  // dbBack.token = jwt.sign(dbBack, 'd01d07cb-609b-4a2a-a291-2d8c7782cd35')
  res.status(200).json(dbBack)
}

exports.list = async (req, res) => {
  console.log(req.user);
  res.send('/user-list')
}

exports.delete = async (req, res) => {
  res.send('delete')
}

//修改
exports.update = async (req, res) => {
  //通过id来找到并更新  返回的结果是更改之前的  加一个配置项new:true，返回的结果为最新的
  const updateData = await User.findByIdAndUpdate(req.user.userInfo._id, req.body, { new: true })
  res.status(201).json({ user: updateData })
}

//处理用户头像上传
exports.headImg = async (req, res) => {
  console.log(req.file);
  const fileArr = req.file.originalname.split('.')
  const fileType = fileArr[fileArr.length - 1]
  //重命名
  try {
    await rename('./public/' + req.file.filename, `./public/${req.file.filename}.${fileType}`)
    res.status(201).json({ filePath: req.file.filename + '.' + fileType })
  } catch (error) {
    res.status(500).json({ error })
  }
}

// module.exports = {

// }

