const express = require('express')
const router = express.Router()
const videoController = require('../controller/video')

router.get('/list', videoController.list)

module.exports = router