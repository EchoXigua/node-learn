const mongoose = require('mongoose')
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
    select: false //查询时候剔除
  },
  ...baseModel
})

module.exports = userSchema