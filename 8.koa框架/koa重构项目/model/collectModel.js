const mongoose = require('mongoose')

//创建数据模型

const baseModel = require('./baseModel')

const collectSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'User'
  },
  videoId: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'Video'//和Video集合关联
  },
  ...baseModel
})

module.exports = collectSchema