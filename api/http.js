const http = require("http")
const fs = require("fs")

const server = http.createServer((request, response) => {
  const { url, method, headers} = request
  if (url === "/" && method === "GET") {
    fs.readFile("index.html", (err, data) => {
      if (err) {
        response.writeHead(500, {
          "Content-Type": "text/plain;charset=uft-8"
        })
        response.end("500 Server Error")
        return
      }

      response.statusCode = 200
      response.setHeader("Content-Type", "text/html")
      response.end(data)
    })
    return
  }

  if (url === "/users" && method === "GET") {
    response.writeHead(200, {
      "Content-Type": "application/json"
    })

    response.end(JSON.stringify({
      name: 'Tome'
    }))

    return 
  }

  // Picture
  if (method === "GET" && headers.accept.indexOf('image/*') > -1) {
    fs.createReadStream(`.${url}`).pipe(response)

    return 
  }
  response.statusCode = 404
  response.end("404 Not Found")

})

server.listen(3000)

function getPropTypeChain(obj) {
  const protoChain = []
  while (obj = Object.getPrototypeOf(obj)) {
    protoChain.push(obj)
  }
  return protoChain
}