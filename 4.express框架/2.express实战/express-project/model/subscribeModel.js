const mongoose = require('mongoose')

//创建数据模型

const baseModel = require('./baseModel')

const subscribeSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'User'
  },
  channel: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'User'
  },
  ...baseModel
})

module.exports = subscribeSchema