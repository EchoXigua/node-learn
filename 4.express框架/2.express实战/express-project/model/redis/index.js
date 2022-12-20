const Redis = require('ioredis')
const { redisClient } = require('../../config/config.default')
const redis = new Redis(redisClient.port, redisClient.host, redisClient.options)

redis.on('err', (err) => {
  if (err) {
    console.log('Redis 链接错误');
    console.log(err);
    //断开连接，否则会一直重试
    redis.quit()
  }
})

redis.on('ready', () => {
  console.log('Redis 链接成功');
})

exports.redis = redis







