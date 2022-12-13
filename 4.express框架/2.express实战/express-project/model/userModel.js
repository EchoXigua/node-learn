const mongoose = require('mongoose')

//加密
const md5 = require('../util/md5')
//创建数据模型

const baseModel = require('./baseModel')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    set: value => md5(value),
    select: false //查询出来的结果中不包含这个
  },
  phone: {
    type: String,
    required: true
  },
  image: { //头像
    type: String,
    default: null
  },
  cover: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  ...baseModel
})

module.exports = userSchema