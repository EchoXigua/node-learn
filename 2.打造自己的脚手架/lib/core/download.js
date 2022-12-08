const downloadGitRepo = require('download-git-repo')
const ora = require('ora')
const chalk = require('chalk')

const download = (url, project) => {
  const spinner = ora().start()
  spinner.text = '代码正在下载中...'
  downloadGitRepo(`direct:${url}`, `./${project}`, { clone: true }, (err) => {
    if (!err) {
      spinner.succeed('代码下载成功！')
      console.log(chalk.blue('Done! you run:'));
      console.log('cd ' + project);
      console.log(chalk.cyan('\tnpm install'));
      console.log(chalk.cyan('\tnpm run dev'));
    } else {
      spinner.fail('代码下载失败！')
    }
  })
}

module.exports = download

