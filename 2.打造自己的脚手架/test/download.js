const download = require('download-git-repo')

//使用clone的方式下载
download('direct:git@gitee.com:beiyaoyaoyao/egg-template.git', './xxx', { clone: true }, (err) => {
  console.log(err);
})