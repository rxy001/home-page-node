const { userInfo } = require('../mysql')
const { createToken } = require('../utils/token')
const saveFile = require('../utils/saveFile')

function db_query(id) {
  return userInfo.findOne({
    where: {
      id
    }
  })
}

module.exports = [
  {
    method: 'post',
    url: '/login',
    callback: async (ctx, next) => {
      await next()
      const user = await userInfo.findOne({
        where: {
          ...ctx.request.body
        }
      })
      const token = createToken({ userId: user.id })
      ctx.cookies.set('token', token, {
        httponly: true,
      })
      ctx.body = {
        success: 'true',
        msg: '登录成功',
      }
    }
  },
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
        mobile: 12333333333,
        ...ctx.request.body,
      })

      const token = createToken({ userId: user.id })
      ctx.cookies.set('token', token, {
        httponly: true,
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
        const localFilePath = await saveFile(file)
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
