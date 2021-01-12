class Router {
  constructor() {
    this.getMap = new Map();
    this.postMap = new Map();
  }

  register(map, path, handler) {
    map.set(path, handler);
  }

  get(path, handler) {
    this.register(this.getMap, path, handler);
  }

  post(path, handler) {
    this.register(this.postMap, path, handler);
  }

  routes() {
    return async (ctx, next) => {
      const path = ctx.url;
      const { method } = ctx;
      const map = method === "get" ? this.getMap : this.postMap;

      const fn = map.get(path);
      if (fn) {
        await fn(ctx);
      }

      await next();
    };
  }
}

module.exports = Router;
