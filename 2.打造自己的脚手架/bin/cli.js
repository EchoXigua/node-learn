#! /usr/bin/env node

// console.log(process.argv);

const { program } = require('commander')

/**
 * 模块化处理
 */
const xgHelp = require('../lib/core/help')
xgHelp(program)

const xgCommander = require('../lib/core/commander')
xgCommander(program)


program.parse(process.argv)

