const xgAction = require('./action')

const xgCommander = (program) => {
  //接受指令
  program
    .command('create <project> [other...]')
    .alias('crt') //别名 
    .description('创建项目') //秒速内容
    .action(xgAction)
}

module.exports = xgCommander