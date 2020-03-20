const Sequelize = require('sequelize');

module.exports = {
  articleList: {
    img: Sequelize.TEXT('tiny'),
    title: Sequelize.TEXT('tiny'),
    intro: Sequelize.TEXT,
    author: Sequelize.TEXT('tiny'),
    userId: Sequelize.INTEGER,
    createdTime: Sequelize.TEXT('tiny'),
  },
  articleContent: {
    articleListId: Sequelize.INTEGER,
    content: Sequelize.TEXT,
    img: Sequelize.TEXT('tiny'),
    title: Sequelize.TEXT('tiny'),
    author: Sequelize.TEXT('tiny'),
    createdTime: Sequelize.TEXT('tiny'),
  }
}