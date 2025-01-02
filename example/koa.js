const serve = require("koa-static");
const Koa = require("koa");
const path = require("path");
const Router = require("@koa/router");
const views = require("koa-views");
const { historyApiFallback } = require("koa2-connect-history-api-fallback");
const { exec } = require("child_process");

const app = new Koa();

app.use(historyApiFallback());

app.use(serve(path.join(__dirname)));

const render = views(path.join(__dirname), {
  map: {
    html: "underscore",
  },
});

app.use(render);

// 初始化路由实例
const router = new Router();

// 设置路由
router.get("/", async (ctx) => {
  await ctx.render("index", {});
});
// 注册路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3009, () => {
  // 自动打开浏览器
  const url = "http://localhost:3009";
  exec(`start ${url}`, { shell: true }, (err) => {
    if (err) {
      console.error("Failed to open browser:", err);
    }
  });
});
