const { articleList, articleContent } = require('../mysql')
const saveFile = require('../utils/saveFile')

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
    url: '/articlContent',
    callback: async (ctx, next) => {
      await next()
      const userId = ctx.token_payload.userId
      const { title, content, intro, author, createdTime } = ctx.request.body
      let filePath = ''
      if (ctx.request.files.img) {
        filePath = await saveFile(ctx.request.files.img)
      }
      const articleListId = await articleList.create({
        title,
        author,
        img: filePath,
        intro,
        createdTime,
        userId: userId
      })
      articleContent.create({
        title,
        author,
        img: filePath,
        content,
        createdTime,
        articleListId: articleListId.dataValues.id
      })
      ctx.body = {
        success: 'true'
      }
    }
  },
  {
    method: 'get',
    url: '/articlContent/:id',
    callback: async (ctx, next) => {
      await next()

      const id = ctx.request.url.split('/').pop()
      const content = await articleContent.findOne({
        where: {
          articleListId: id
        }
      })
      ctx.body = {
        data: content,
        success: 'true'
      }
    }
  },
  {
    method: 'delete',
    url: '/articlContent/:id',
    callback: async (ctx, next) => {
      await next()

      const id = ctx.request.url.split('/').pop()
      // const content = await articleContent.findOne({
      //   where: {
      //     articleListId: id
      //   }
      // })
      // await content.destroy()

      const list = await articleList.findOne({
        id,
      })
      await list.destroy()
      ctx.body = {
        success: 'true',
        msg: '删除成功'
      }
    }
  },
]