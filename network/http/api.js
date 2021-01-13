const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const { method, url } = req;

  console.log(req.headers.cookie);

  // Process preflight request
  if (method === "OPTIONS") {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Headers": "X-Token,Content-Type",
      "Access-Control-Allow-Credentials": "true",
      // "Access-Control-Allow-Methods": "PUT",
    });
    res.end();
    return;
  }

  if (method === "GET" && url === "/") {
    fs.readFile("index.html", (err, data) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
    return;
  }

  if (method === "GET" && url === "/api/users") {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    // 允许跨域使用cookies
    res.setHeader("Access-Control-Allow-Credentials", "true");
    // 设置cookies
    res.setHeader("Set-Cookie", "yay=iupipi;");
    res.end(JSON.stringify([{ name: "tom", age: 20 }]));

    return;
  }

  if ((method === "POST") & (url === "/api/save")) {
    // req is a stream
    const reqData = [];

    req.on("data", (data) => {
      reqData.push(data);
    });

    req.on("end", () => {
      const data = Buffer.concat(reqData);
      const parsed = data.toString();
      console.log("data", parsed);
      res.end(`form data`, parsed);
    });
  }
});

server.listen(4000, () => {
  console.log(`api listen at ${4000}`);
});
