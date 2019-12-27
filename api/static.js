const fs = require('fs-extra')
const path = require('path')

module.exports = [{
  method: 'get',
  url: '/static/img/:name',
  callback: async (ctx, next) => {
    await next()
    ctx.body = fs.readFileSync(path.join(__dirname, '../', decodeURI(ctx.request.url)))
  }
}]