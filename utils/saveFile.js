const path = require('path')
const fs = require('fs-extra')

module.exports = async function (file) {
  console.log(file)
  const dir = '/static/img/'
  await fs.ensureDirSync(dir)
  const tempFilePath = file.path
  const saveFilePath = dir + file.name
  return new Promise((resolve, reject) => {
    let render = fs.createReadStream(tempFilePath);
    let upStream = fs.createWriteStream(saveFilePath);
    render.pipe(upStream);
    upStream.on('finish', () => {
      resolve(saveFilePath)
    });
    upStream.on('error', (err) => {
      reject(err)
    });
  })
}