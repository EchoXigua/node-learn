#! /usr/bin/env node

// console.log(process.argv);

const { program } = require('commander')

program
  .option('-f, --framework <framework>', '设置框架')

//接受指令
program
  .command('create <project> [other...]')
  .alias('crt') //别名 
  .description('创建项目') //秒速内容
  .action((project, args) => { //用户输入之后做的处理
    //命令行执行逻辑的代码
    console.log(project, args);
  })


program.parse(process.argv)

