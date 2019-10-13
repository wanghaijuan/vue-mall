import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store/index'
import interceptor from './interceptor'

Vue.config.productionTip = true



const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 执行拦截起器的初始化
interceptor(app)