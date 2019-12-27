const fs = require('fs')

module.exports = function () {
  const router = require('koa-router')()

  const files = fs.readdirSync(__dirname).filter((f) => {
    return f.endsWith('.js') && !f.startsWith('index')
  });

  files.forEach((fileName) => {
    const api = require(__dirname + '/' + fileName)
    api.forEach((v) => {
      router[v.method](v.url, v.callback)
    })
  })

  return router.routes()
}