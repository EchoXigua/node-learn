// import inquirer from "inquirer";  es module

//8版本的require导入，commonjs module   9版本的得import导入 es module
const inquirer = require('inquirer')
const config = require('../../config')
const download = require('./download')

const xgAction = async (project, args) => {
  const { framework } = await inquirer.prompt([
    {
      type: 'list', //列表
      name: 'framework',
      //给用户选择的内容
      choices: config.framework,
      message: '请选择你使用的框架'
    }
  ])
  // console.log(framework);

  //下载模板
  download(config.frameworkUrl[framework], project)
}


// const xgAction1 = (project, args) => {
//   inquirer.prompt([
//     {
//       type: 'list', //列表
//       name: 'framework',
//       //给用户选择的内容
//       choices: config.framework,
//       message: '请选择你使用的框架'
//     }
//   ]).then((answer) => {
//     console.log(answer);
//   })
// }

module.exports = xgAction