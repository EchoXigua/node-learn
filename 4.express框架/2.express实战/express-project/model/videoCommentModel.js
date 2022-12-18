const mongoose = require('mongoose')

//创建数据模型

const baseModel = require('./baseModel')

const videoCommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  videoId: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'Video'//和Video集合关联
  },
  user: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'User'
  },
  ...baseModel
})

module.exports = videoCommentSchema