
const Sequelize = require('sequelize');

module.exports = {
  userInfo: {
    username: Sequelize.STRING(20),
    gender: Sequelize.BOOLEAN,
    mobile: Sequelize.STRING(11),
    backgroundImage: Sequelize.TEXT,
    password: Sequelize.STRING(20),
  }
}