const { User } = require('../model')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  console.log(req.body);
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
  dbBack.token = jwt.sign(dbBack, 'd01d07cb-609b-4a2a-a291-2d8c7782cd35')
  res.status(200).json(dbBack)
}

exports.list = async (req, res) => {
  console.log(req.method);
  res.send('/user-list')
}

exports.delete = async (req, res) => {
  console.log('delete');
  res.send('delete')
}

// module.exports = {

// }

