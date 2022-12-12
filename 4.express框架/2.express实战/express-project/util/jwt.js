const jwt = require('jsonwebtoken')

const { } = require('ut')
module.exports.createToken = async (userInfo) => {
  jwt.sign(userInfo)
}

