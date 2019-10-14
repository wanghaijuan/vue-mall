import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Cart from '@/views/Cart'
import History from '@/utils/history'

Vue.use(History)
Vue.use(VueRouter)

// 扩展Router，添加goBack方法
VueRouter.prototype.goBack = function() {
  this.isBack = true;
  this.back();
};

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart
  },
  {
    path: "/about",
    name: "about",
    meta: {
      auth: true      // 路由守卫 拦截
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  } 
]


// eslint-disable-next-line no-new
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/***
 * 令牌机制
 * 客户端第一次请求服务端，服务端判断有没有令牌，没有就返回401
 * 客户端请求登录，登录成功服务端就返回token，客户端储存cookie或这localStorage保存
 * 以后接口都携带该令牌，服务端才会返回数据
 * 令牌：不管谁拿到该令牌，只要没过期，验证正确就会返回数据
 */

/**
 * session
 * 登录数据在服务端存储
 * 为了本地持久化，本地cookie存储一个session ID
 * 如果用户被钓鱼网站勾引，在钓鱼网站上执行了一些脚本
 * 请求了本网站，由于就是在该机子上发送的，cookie照样发送给后台
 */

// 路由钩子  
router.beforeEach((to, from, next) => {
  // 需要验证身份
  if(to.meta.auth) {
    // 需要登录
    const token = localStorage.getItem('token');
    if(token){
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.path }  // 未登录前想前往的网址
      });
    }
  } else {  // 不需要登录验证直接放行
    next();
  }
})

// 每次从路由出来以后
router.afterEach((to, from) => {
  if (router.isBack) {
    History.pop();
    router.isBack = false;
    router.transitionName = "route-back";
  } else {
    History.push(to.path);
    router.transitionName = "route-forward";
  }
});

export default router
