const Redis = require('ioredis')
const redis = new Redis(6379, '127.0.0.1', { password: '123456' })
redis.set('mykey11', 'value')
redis.keys('*').then(res => {
  console.log(res)
})