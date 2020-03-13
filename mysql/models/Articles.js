const Sequelize = require('sequelize');

module.exports = {
  articleList: {
    img: Sequelize.STRING,
    title: Sequelize.STRING,
    intro: Sequelize.STRING,
    author: Sequelize.STRING,
    userId: Sequelize.INTEGER
  },
  articleContent: {
    articleListId: Sequelize.INTEGER,
    content: Sequelize.TEXT,
    img: Sequelize.STRING,
    title: Sequelize.STRING,
    author: Sequelize.STRING,
  }
}