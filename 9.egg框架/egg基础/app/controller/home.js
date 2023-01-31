'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'hi, egg';
    const arr = this.service.user.getUserList()
    ctx.body = arr
  }
}

module.exports = HomeController;
