const Koa = require("./src/index");

const app = new Koa();

// app.use(async (ctx, next) => {
//   const start = Date.now();
//   await next();
//   const end = Date.now();
//   console.log(`url: ${ctx.url} and takes: ${parseInt(end - start)}ms`);
// });

app.use((ctx) => {
  ctx.body = "888";
});

app.listen(3000);
