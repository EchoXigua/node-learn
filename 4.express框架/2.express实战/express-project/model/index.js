const mongoose = require('mongoose')
const { mongoPath } = require('../config/config.default')

async function main() {
  //链接数据库
  await mongoose.connect(mongoPath)
}

main()
  .then(res => {
    console.log('mongo 链接成功');
  })
  .catch((err) => {
    console.log(err);
    console.log('mongo 链接失败');
  })

module.exports = {
  User: mongoose.model('User', require('./userModel')),
  Video: mongoose.model('Video', require('./videoModel')),
  Subscribe: mongoose.model('Subscribe', require('./subscribeModel')),
  VideoComment: mongoose.model('VideoComment', require('./VideoCommentModel')),
  Videolike: mongoose.model('Videolike', require('./VideolikeModel')),
}

//创建数据模型
// const user = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true
//   },
//   age: {
//     type: Number,
//     required: true
//   }
// })

//第一个参数为集合名字，如果存在直接链接，不存在最末尾加一个s并创建
// const userModel = mongoose.model('User', user)
// const u = new userModel({ username: 'list', age: 18 })
// u.save()

