//内置模块
const crypto = require('crypto')
// console.log(crypto);

//md5 对相同的明文加密后的密文相同
// let str = crypto.createHash('md5').update('xg' + '132').digest('hex')
// console.log(str);

module.exports = str => {
  return crypto.createHash('md5').update('xg' + str).digest('hex')
}
