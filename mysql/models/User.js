
const Sequelize = require('sequelize');

module.exports = {
  userInfo: {
    username: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    mobile: Sequelize.STRING(10),
    backgroundImage: Sequelize.TEXT,
    password: Sequelize.STRING(10),
  }
}