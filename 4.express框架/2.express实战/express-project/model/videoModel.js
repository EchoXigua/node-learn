const mongoose = require('mongoose')

//创建数据模型

const baseModel = require('./baseModel')

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  vodVideoId: {
    type: String,
    required: true
  },
  user: { //头像
    type: mongoose.ObjectId,
    required: true,
    ref: 'User'
  },
  cover: {
    type: String,
    default: null
  },
  //评论数量
  commentCount: {
    type: Number,
    default: 0
  },
  //喜欢
  likeCount: {
    type: Number,
    default: 0
  },
  dislikeCount: {
    type: Number,
    default: 0
  },
  ...baseModel
})

module.exports = videoSchema