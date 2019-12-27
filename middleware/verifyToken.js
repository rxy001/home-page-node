const { verifyToken } = require('../utils/token')

module.exports = (options = {}) => {
  return async (ctx, next) => {
    if (Array.isArray(options.excludes)) {
      const exist = options.excludes.some((v) => {
        if (typeof v === 'string') {
          return v === ctx.request.url
        } else if (Object.prototype.toString.call(v) === '[object Object]') {
          const { url, method } = ctx.request
          return v.url === url && v.method === method.toLowerCase()
        } else {
          return false
        }
      })
      if (exist) {
        await next()
        return
      }
    }

    const token = ctx.cookies.get('token')
    try {
      ctx.token_payload = await verifyToken(token)
      await next()
    } catch (err) {
      ctx.body = {
        msg: 'token验证失败'
      }
    }
  }
}