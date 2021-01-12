const http = require("http");

class xKoa {
  constructor() {}

  use(callback) {
    this.callback = callback;
  }

  listen(...args) {
    const server = http.createServer((request, response) => {
      this.callback(request, response);
    });

    server.listen(...args);
  }
}

module.exports = xKoa;
