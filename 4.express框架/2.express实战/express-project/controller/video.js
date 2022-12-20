const { Video, VideoComment, Videolike, Subscribe, Collect } = require('../model')
const { hotInc, topHots } = require('../model/redis/host')

/**
 *  视频热门机制
 *  观看+1
 *  点赞+2
 *  评论+2
 *  收藏+3
 */

exports.getHots = async (req, res) => {
  const topnum = req.params.topnum
  const tops = await topHots(topnum)
  res.status(200).json({ tops })
}


exports.collect = async (req, res) => {
  const videoId = req.params.videoId
  const userId = req.user.userInfo._id
  const video = await Video.findById(videoId)
  if (!video) {
    return res.status(404).json({ err: '视频不存在' })
  }
  //当前用户有没有收藏改视频
  const doc = await Collect.findOne({
    user: userId,
    videoId
  })
  if (doc) {
    return res.status(403).json({ err: '视频已经被收藏了' })
  }
  const myCollect = await new Collect({
    user: userId,
    videoId
  }).save()

  //让改视频增长热度
  if (myCollect) {
    await hotInc(videoId, 3)
  }


  res.status(200).json({ myCollect })

}

exports.likelist = async (req, res) => {
  const { pageNum = 1, pageSize = 10 } = req.body
  const likes = await Videolike.find({
    like: 1,
    user: req.user.userInfo._id
  }).skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .populate('videoId', '_id title vodVideoId user')
  const likeCount = await Videolike.countDocuments({
    like: 1,
    user: req.user.userInfo._id
  })
  res.status(200).json({ likes, likeCount })
}

exports.dislikeVideo = async (req, res) => {
  const videoId = req.params.videoId
  const userId = req.user.userInfo._id
  //先判断视频是否还存在
  const video = await Video.findById(videoId)
  if (!video) {
    return res.status(404).json({ err: '视频不存在' })
  }
  const doc = await Videolike.findOne({
    user: userId,
    videoId
  })

  let isDislike = true

  if (doc && doc.like === -1) {
    //如果是喜欢的，第二次就删除喜欢
    await doc.remove()
  } else if (doc && doc.like === 1) {
    doc.like = -1
    await doc.save()
    isDislike = false
  } else {
    await new Videolike({
      user: userId,
      videoId,
      like: 1
    }).save()
    isDislike = false
  }

  //找到视频喜欢的数量
  video.likeCount = await Videolike.countDocuments({
    videoId,
    like: 1
  })

  video.dislikeCount = await Videolike.countDocuments({
    videoId,
    like: -1
  })

  await video.save()
  res.status(200).json({
    ...video.toJSON(),
    isDislike
  })

}


exports.likeVideo = async (req, res) => {
  const videoId = req.params.videoId
  const userId = req.user.userInfo._id
  //先判断视频是否还存在
  const video = await Video.findById(videoId)
  if (!video) {
    return res.status(404).json({ err: '视频不存在' })
  }
  const doc = await Videolike.findOne({
    user: userId,
    videoId
  })

  let isLike = true

  if (doc && doc.like === 1) {
    //如果是喜欢的，第二次就删除喜欢
    await doc.remove()
    isLike = false
  } else if (doc && doc.like === -1) {
    doc.like = 1
    await doc.save()
    //增长热度
    await hotInc(videoId, 2)
  } else {
    await new Videolike({
      user: userId,
      videoId,
      like: 1
    }).save()
    await hotInc(videoId, 2)
  }

  //找到视频喜欢的数量
  video.likeCount = await Videolike.countDocuments({
    videoId,
    like: 1
  })

  video.dislikeCount = await Videolike.countDocuments({
    videoId,
    like: -1
  })

  await video.save()
  res.status(200).json({
    ...video.toJSON(),
    isLike
  })

}

exports.deleteComment = async (req, res) => {
  const { videoId, commentId } = req.params
  const videoInfo = await Video.findById(videoId)
  if (!videoInfo) {
    return res.status(404).json({ err: '视频不存在' })
  }
  const comment = await VideoComment.findById(commentId)
  if (!comment) {
    return res.status(404).json({ err: '评论不存在' })
  }
  if (!comment.user.equals(req.user.userInfo._id)) {
    //不能删除其他人的评论  权限问题
    return res.status(403).json({ err: '评论不可删除' })
  }
  await comment.remove()
  videoInfo.commentCount--
  await videoInfo.save()
  res.status(200).json({ msg: '删除成功' })
}

exports.commentList = async (req, res) => {
  const { videoId } = req.params
  const { pageNum = 1, pageSize = 10 } = req.body
  const commentList = await VideoComment.find({ videoId })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .populate('user', '_id username image ')
  const commentCount = await VideoComment.countDocuments({ videoId })
  res.status(201).json({ list: commentList, count: commentCount })
}

exports.comment = async (req, res) => {
  const { videoId } = req.params
  const videoInfo = await Video.findById(videoId)
  if (!videoInfo) {
    return res.status(404).json({ err: '视频不存在' })
  }
  const comment = await new VideoComment({
    content: req.body.content,
    videoId,
    user: req.user.userInfo._id
  }).save()
  await hotInc(videoId, 2)

  videoInfo.commentCount++
  await videoInfo.save()
  res.status(201).json(comment)
}


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
  const videoId = req.params.videoId
  let videoInfo = await Video.findById(videoId)
    //第二个参数为需要查询的字段名 空格隔开
    .populate('user', '_id username cover')

  videoInfo = videoInfo.toJSON()

  videoInfo.islike = true
  videoInfo.isDislike = false
  videoInfo.isSubscribe = false

  if (req.user.userInfo) {
    //说明登录了
    const userId = req.user.userInfo._id
    //曾经喜欢过
    if (await Videolike.findOne({ user: userId, videoId, like: 1 })) {
      videoInfo.islike = true
    }
    if (await Videolike.findOne({ user: userId, videoId, like: -1 })) {
      videoInfo.isDislike = true
    }
    if (await Subscribe.findOne({ user: userId, channel: videoInfo.user._id })) {
      videoInfo.isSubscribe = true
    }
  }
  await hotInc(videoId, 1)
  res.status(200).json(videoInfo)
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