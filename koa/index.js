const Koa = require("./src/index");
const Router = require("./src/router");

const router = new Router();
const app = new Koa();

// app.use(async (ctx, next) => {
//   const start = Date.now();
//   await next();
//   const end = Date.now();
//   console.log(`url: ${ctx.url} and takes: ${parseInt(end - start)}ms`);
// });

const delay = () => new Promise((resolve) => setTimeout(() => resolve(), 2000));

// app.use(async (ctx, next) => {
//   ctx.body = "1";
//   await next();
//   ctx.body += "5";
// });
// app.use(async (ctx, next) => {
//   ctx.body += "2";
//   await delay();
//   await next();
//   ctx.body += "4";
// });
// app.use(async (ctx, next) => {
//   ctx.body += "3";
//   await next();
// });

router.get("/index", async (ctx) => {
  ctx.body = "index page";
});
router.get("/post", async (ctx) => {
  ctx.body = "post page";
});
router.get("/list", async (ctx) => {
  ctx.body = "list page";
});
router.post("/index", async (ctx) => {
  ctx.body = "post page";
});

app.use(router.routes());

app.listen(3000);
