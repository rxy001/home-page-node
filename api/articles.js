const { articleList, articleContent } = require('../mysql')

module.exports = [
  {
    method: 'get',
    url: '/articlesList',
    callback: async (ctx, next) => {
      await next()
      const userId = ctx.token_payload.userId
      const body = await articleList.findAll({
        userId: userId
      })
      ctx.body = {
        records: body,
        success: 'true'
      }
    }
  },
  {
    method: 'post',
    url: '/articles',
    callback: async (ctx, next) => {
      await next()
      const userId = ctx.token_payload.userId
      const { title, content, img, intro, author } = ctx.request.body
      console.log(intro)
      const articleListId = await articleList.create({
        title,
        author,
        img,
        intro,
        userId: userId
      })
      articleContent.create({
        title,
        author,
        img,
        content,
        articleListId: articleListId.dataValues.id
      })
      ctx.body = {
        success: 'true'
      }
    }
  }]