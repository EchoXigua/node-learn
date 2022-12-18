const mongoose = require('mongoose')

//创建数据模型

const baseModel = require('./baseModel')

const videolikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'User'
  },
  video: {
    type: String,
    required: true,
    ref: 'Video'
  },
  like: {
    type: Number,
    enum: [1, -1], //1喜欢
    required: true
  },
  videoId: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'Video'//和Video集合关联
  },

  ...baseModel
})

module.exports = videolikeSchema