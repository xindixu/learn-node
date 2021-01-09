
// // const data = fs.readFileSync('./file.js')

// // callback style
// fs.readFile('./file.js', (err, data) => {
//   if (err) {
//     throw err
//   }
// })



(async () => {
  const fs = require('fs')
  const { promisify } = require('util')
  const readFile = promisify(fs.readFile)

  const data = await readFile('./file.js')
  console.log(data)
})()