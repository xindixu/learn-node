const Koa = require("./src/index");

const app = new Koa();

// app.use(async (ctx, next) => {
//   const start = Date.now();
//   await next();
//   const end = Date.now();
//   console.log(`url: ${ctx.url} and takes: ${parseInt(end - start)}ms`);
// });

const delay = () => new Promise((resolve) => setTimeout(() => resolve(), 2000));

app.use(async (ctx, next) => {
  ctx.body = "1";
  await next();
  ctx.body += "5";
});
app.use(async (ctx, next) => {
  ctx.body += "2";
  await delay();
  await next();
  ctx.body += "4";
});
app.use(async (ctx, next) => {
  ctx.body += "3";
});

app.listen(3000);
