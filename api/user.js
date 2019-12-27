const { userInfo } = require('../mysql')
const fs = require('fs-extra')
const { createToken } = require('../utils/token')

function db_query(id) {
  return userInfo.findOne({
    where: {
      id
    }
  })
}

module.exports = [
  {
    method: 'get',
    url: '/userInfo',
    callback: async (ctx, next) => {
      await next()
      const body = await db_query(ctx.token_payload.userId)
      ctx.type = 'application/json'
      ctx.body = {
        data: body || {},
        success: 'true',
      }
    }
  },
  {
    method: 'post',
    url: '/userInfo',
    callback: async (ctx, next) => {
      await next()
      const user = await userInfo.create({
        backgroundImage: '',
        gender: '',
        ...ctx.request.body,
      })

      const token = createToken({ userId: user.id })
      ctx.cookies.set('token', token, {
        httponly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,   // cookie有效时长
      })
      ctx.body = {
        success: 'true',
        msg: '成功创建用户',
      }
    }
  },
  {
    method: 'put',
    url: '/userInfo',
    callback: async (ctx, next) => {

      await next()

      let body = await db_query(ctx.token_payload.userId)

      const file = ctx.request.files.backgroundImage

      if (file) {
        const dir = 'static/img/'
        fs.ensureDirSync(dir)

        const localFilePath = await saveFile(file.path, dir + file.name)
        body.backgroundImage = localFilePath
      }

      Object.assign(body, ctx.request.body)

      await body.save()

      ctx.body = {
        msg: '修改成功！',
        success: 'true',
      }
    }
  }]

const saveFile = (file, path) => {
  return new Promise((resolve, reject) => {
    let render = fs.createReadStream(file);
    let upStream = fs.createWriteStream(path);
    render.pipe(upStream);
    upStream.on('finish', () => {
      resolve(path)
    });
    upStream.on('error', (err) => {
      reject(err)
    });
  })
}