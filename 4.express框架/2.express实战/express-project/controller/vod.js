const RPCClient = require('@alicloud/pop-core').RPCClient

function initVodClient(accessKeyId, accessSecret) {
  const regionId = 'cn-shanghai'
  const client = new RPCClient({
    accessKeyId: accessKeyId,
    accessKeySecret: accessSecret,
    endpoint: `https://vod.${regionId}.aliyuncs.com`,
    apiVersion: '2017-03-21'
  })
  return client
}

exports.getVod = async (req, res) => {
  const client = initVodClient('LTAI5tDqZRL4cJGm3kkcgUj9', 'Sz0lch1HyhF4P2fSfmI8f4vJVqZ9pr')
  const vodBack = await client.request('CreateUploadVideo', {
    Title: 'this is a sample test',
    FileName: 'filename.mp4',
    setStorageLocation: 'outin-75002b1e7ac311eda63200163e1c60dc.oss-cn-shanghai.aliyuncs.com'
  })
  console.log('vod', vodBack);
  res.status(200).json({ vod: vodBack })
}