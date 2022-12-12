exports.list = async () => {
  console.log(req.method);
  res.send('/video-list')
}