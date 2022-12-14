const express = require('express')
const router = express.Router()
const videoController = require('../controller/video')
const vodController = require('../controller/vod')
const { verifyToken } = require('../util/jwt')
const { videoValidator } = require('../middleware/validator/videoValidator')

router
  .get('/videolist', videoController.videoList)
  /**
   * 需要将接口做为半登陆的状态，这里需要外部传参数，来做不同的处理
   * 所以需要柯里化
   * */
  .get('/videolist/:videoId', verifyToken(false), videoController.video)
  .get('/getvod', verifyToken(), vodController.getVod)
  .post('/createvideo', verifyToken(), videoValidator, videoController.createVideo)
module.exports = router