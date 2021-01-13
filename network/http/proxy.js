// proxy.js
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(express.static(`${__dirname}/`));
app.use(
  "/api",
  createProxyMiddleware({
    // This app is running on 3000, but route all incoming requests to 4000
    target: "http://localhost:4000",
    changeOrigin: false,
  })
);
app.listen(3000);

module.exports = app;
