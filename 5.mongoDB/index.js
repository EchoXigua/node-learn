const { MongoClient } = require('mongodb')

const client = new MongoClient('mongodb://127.0.0.1:27017')

const clientFun = async (c) => {
  await client.connect()  //链接
  //链接哪一个数据库
  const db = client.db('mytest') //拿到mytest数据库
  return db.collection(c) //拿到传入的集合
}

const main = async () => {
  const cc = await clientFun('cc') //clientFun 也是异步的
  // const res = await cc.find({})
  // console.log(await res.toArray());

  //添加
  // const d = await cc.insertOne({ username: 'monica', age: 25 })
  // const d = await cc.insertMany([
  //   { username: 'kaka', age: 35 },
  //   { username: 'xixi', age: 45 },
  //   { username: 'haha', age: 55 },
  // ])


  //查询
  // const d = await cc.find({ age: { $gt: 15 } })
  // console.log(await d.toArray());

  // const d = await cc.findOne({ age: { $gt: 15 } })
  // console.log(d);

  //修改
  // const d = await cc.updateOne({ username: '王五' }, { $set: { age: 55 } })
  // const d = await cc.updateMany({ age: { $gt: 30 } }, { $set: { age: 33 } })
  // console.log(d);

  //删除   lt  小于 gt  大于
  // const d = await cc.deleteOne({ age: { $lt: 20 } })
  const d = await cc.deleteMany({ age: { $lt: 30 } })
  console.log(d);
}
//这个地方查询完之后，发现进程还在进行，没有断开，需要自己断开
main().finally(() => {
  client.close()
})


