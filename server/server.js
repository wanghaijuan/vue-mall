const Koa = require("koa");
const Router = require("koa-router");
// 生成令牌、验证令牌
const jwt = require("jsonwebtoken");
const jwtAuth = require("koa-jwt");

// 生成数字签名的秘钥
const secret = "It's a secret";

const app = new Koa();
const router = new Router();

router.get("/api/login", async ctx => {
  const { username, password } = ctx.query;
  console.log(username, password);

  if (username == "11" && password == "11") {
    // 生成令牌
    const token = jwt.sign(
      {
        data: { name: "11" }, // 用户信息数据
        exp: Math.floor(Date.now() / 1000) + 60 * 60 // 过期时间
      },
      secret
    );
    ctx.body = { code: 1, token };
  } else {
    ctx.status = 401;
    ctx.body = { code: 0, message: "用户名或者密码错误" };
  }
});

router.get(
  "/api/userinfo",
  jwtAuth({ secret }),
  async ctx => {
    ctx.body = { code: 1, data: { name: "11", age: 11 } };
  }
);
app.use(router.routes());
app.listen(3000);