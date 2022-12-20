/**
 * 默认配置
 */

module.exports.uuid = 'd01d07cb-609b-4a2a-a291-2d8c7782cd35'


module.exports.mongoPath = 'mongodb://localhost:27017/express-video'

module.exports.redisClient = {
  host: '127.0.0.1',
  port: 6379,
  options: {
    password: 'root'
  }
}