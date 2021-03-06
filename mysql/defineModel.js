const sequelize = require('./init')
const Sequelize = require('Sequelize')

module.exports = function defineModel(name, attributes) {
  const attrs = {};
  for (let key in attributes) {
    let value = attributes[key];
    if (typeof value === 'object' && value['type']) {
      value.allowNull = value.allowNull || false;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: false
      };
    }
  }
  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: false,
    autoIncrement: true,
    charset: 'utf8',
  });
}