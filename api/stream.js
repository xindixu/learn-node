const fs = require('fs')
const rs = fs.createReadStream('./profile.jpg')
const ws = fs.createWriteStream('./profile-2.jpg')
rs.pipe(ws)