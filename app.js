const Koa = require('koa')
const api = require('./api')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const app = new Koa()
const verifyToken = require('./middleware/verifyToken')

app.use(cors({
  origin: 'http://localhost:3000', //webpack打包后会生成index.html和static目录，我直接放在本地启动的nginx静态目录html下用来运行webpack打包文件，所以Origin地址为http://127.0.0.1 
  allowedHeaders: 'Origin, x-requested-with, Content-Type', //X-Token为自定义的头字段
  credentials: true //设置成true 请求中才会带上cookie信息，否则请求失败
}));

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
  }
}))

app.use(verifyToken({
  excludes: [{
    url: '/userInfo',
    method: 'post'
  }, '/basic']
}))

app.use(api())

app.listen(3001)
