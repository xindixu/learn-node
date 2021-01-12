const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");

class xKoa {
  constructor() {
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  listen(...args) {
    const server = http.createServer(async (req, res) => {
      const ctx = this.createContext(req, res);
      // create middleware

      const fn = this.compose(this.middlewares);
      await fn(ctx);
      // response
      res.end(ctx.body);
    });

    server.listen(...args);
  }

  compose(middlewares) {
    return function (ctx) {
      const dispatch = (index) => {
        const fn = middlewares[index];

        if (!fn) {
          return Promise.resolve();
        }
        return Promise.resolve(fn(ctx, () => dispatch(index + 1)));
      };

      return dispatch(0);
    };
  }

  createContext(req, res) {
    // context -> Request -> req
    // context -> Response -> res
    // context -> req
    // context -> res

    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);

    ctx.req = req;
    ctx.request.req = req;
    ctx.res = res;
    ctx.response.res = res;
    return ctx;
  }
}

module.exports = xKoa;
