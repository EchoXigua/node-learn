const { User } = require('../model')

module.exports.index = async (ctx, next) => {
  console.log('params', ctx.params.userId);
  console.log(require('../utils/md5')(ctx.params.userId));
  // const user = await User.findById(ctx.params.userId)
  ctx.body = 'user Controller'
}