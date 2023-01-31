const mongoose = require('mongoose')
const { mongoPath } = require('../config/config.default')

async function main() {
  await mongoose.connect(mongoPath)
}
main()
  .then(res => {
    console.log('mongoDB 连接成功');
  })
  .catch(err => {
    console.log('err:' + err);
  })

module.exports = {
  //引入数据模型，
  User: mongoose.model('User', require('./userModel'))
}
