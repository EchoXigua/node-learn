const { Video } = require('../model')

exports.videoList = async (req, res) => {
  //分页查询
  const { pageNum = 1, pageSize = 10 } = req.body

  const videoList = await Video.find()
    //跳过
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    //根据创建时间来排，倒序
    .sort({ createAt: -1 })
    //关联查询，会根据user来查询相关的信息
    .populate('user', '_id username cover')
  const videoCount = await Video.countDocuments()
  res.status(200).json({ videoList, videoCount })
}

exports.video = async (req, res) => {
  const videoInfo = await Video.findById(req.params.videoId)
    //第二个参数为需要查询的字段名 空格隔开
    .populate('user', '_id username cover')
  res.send(videoInfo)
}

exports.createVideo = async (req, res) => {
  const body = req.body
  body.user = req.user.userInfo._id
  const videoModel = new Video(body)
  try {
    const dbBack = await videoModel.save()
    res.status(201).json({ dbBack })
  } catch (error) {
    res.status(500).json({ error })
  }
}