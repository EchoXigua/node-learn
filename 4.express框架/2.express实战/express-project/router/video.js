const express = require('express')
const router = express.Router()
const videoController = require('../controller/video')
const vodController = require('../controller/vod')

router
  .get('/list', videoController.list)
  .get('/getvod', vodController.getVod)
module.exports = router