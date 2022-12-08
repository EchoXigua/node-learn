const ora = require('ora') //5版本是commonjs  6版本是es module  
const spinner = ora().start()
spinner.text = 'loading....'

setTimeout(() => {
  // spinner.succeed('成功')
  // spinner.fail('失败')
  spinner.info('信息')
}, 3000)