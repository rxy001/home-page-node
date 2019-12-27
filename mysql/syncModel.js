const fs = require('fs')
const defineModel = require('./defineModel')

module.exports = function () {
  const models = {}

  const files = fs.readdirSync(__dirname + '/models/').filter((f) => {
    return f.endsWith('.js');
  });

  files.forEach((fileName) => {
    const modelConfig = require(__dirname + '/models/' + fileName)
    Object.keys(modelConfig).forEach((tableName) => {
      models[tableName] = defineModel(tableName, modelConfig[tableName])
    })
  })
  return models
}