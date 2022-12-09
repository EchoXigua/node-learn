const express = require('express')
const app = express()
const fs = require('fs')

const { promisify } = require('util')
//promisify 将回调函数转为promise函数
const readFile = promisify(fs.readFile)
const write = promisify(fs.writeFile)

// app.use(express.urlencoded())
app.use(express.json())


app.get('/', async (req, res) => {
  // fs.readFile('./database.json', 'utf-8', (err, data) => {
  //   if (!err) {
  //     const back = JSON.parse(data)
  //     res.send(back.user)
  //   } else {
  //     //设置响应的状态
  //     res.status(500).json({ err })
  //   }
  // })
  try {
    const back = await readFile('./database.json', 'utf-8')
    const json = JSON.parse(back)
    res.send(json.user)
  } catch (error) {
    res.status(500).json({ err })
  }
})

app.post('/', async (req, res) => {
  const body = req.body
  if (!body) {
    res.status(403).json({
      error: '缺少用户信息'
    })
  }
  const back = await readFile('./database.json', 'utf-8')
  const json = JSON.parse(back)
  //对新增的用户数据处理id
  body.id = json.user[json.user.length - 1].id + 1
  console.log(body);

  json.user.push(body)

  try {
    const w = await write('./database.json', JSON.stringify(json))
    if (!w) {
      res.status(200).send({
        msg: '添加成功'
      })
    }
  } catch (error) {
    res.status(500).json({
      error
    })
  }
})

app.put('/:id', async (req, res) => {
  const body = req.body

  try {
    const back = await readFile('./database.json', 'utf-8')
    const json = JSON.parse(back)

    let userId = Number.parseInt(req.params.id)
    const user = json.user.find(item => item.id == userId)
    if (!user) {
      //没有找到这个用户id
      res.status(403).json({
        error: '用户不存在'
      })
    }
    //找到了这个用户
    for (let key in body) {
      json.user[userId - 1][key] = body[key]
    }
    console.log(json.user);
    const u = await write('./database.json', JSON.stringify(json))
    if (!u) {
      res.status(201).send({
        msg: '修改成功'
      })
    }
  } catch (error) {
    res.status(500).json({
      error
    })
  }

})



app.listen('8080', () => {
  console.log('Run http://127.0.0.1:8080');
})
