const { basic } = require('../mysql')

module.exports = [{
  method: 'get',
  url: '/basic',
  callback: async (ctx, next) => {
    await next()
    console.log('basic', basic)
    const user = await basic.create({
      backgroundImage: '阿萨德阿萨德as打算',
    })
  }
}]