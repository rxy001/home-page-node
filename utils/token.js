const jwt = require('jsonwebtoken')

const privateKey = 'xingyu'

exports.createToken = function (payload) {
  return jwt.sign(payload, privateKey)
}

exports.verifyToken = function (token) {

  if (token === undefined) {
    return Promise.reject()
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, function (err, payload) {
      if (!err) {
        resolve(payload)
      } else {
        reject(err)
      }
    })
  })
}