//处理热门视频
const { redis } = require('./index')

exports.hotInc = async (videoId, incNum) => {
  //ZSet类型 有序集合
  const data = await redis.zscore('videohots', videoId)
  if (data) {
    var inc = await redis.zincrby('videohots', incNum, videoId)
  } else {
    //没有的话新增
    var inc = await redis.zadd('videohots', incNum, videoId)
  }
  return inc
}

exports.topHots = async (num) => {
  const sort = await redis.zrevrange('videohots', 0, -1, 'withscores')
  //redis 中获取的数据为数组，且key 和 value 逐一存放在数组中
  //[a1,2, a2,3,  a3,4]
  const arr = sort.slice(0, num * 2)
  const obj = {}
  for (let i = 0; i < arr.length; i++) {
    if (i % 2 == 0) {
      obj[arr[i]] = arr[i + 1]
    }
  }
  return obj
}
