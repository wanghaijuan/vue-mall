import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store/index'
import interceptor from './interceptor'
import {createAPI} from 'cube-ui'
import CartAnim from "@/components/CartAnim.vue"
import create from '@/utils/create'

Vue.config.productionTip = false

// 给Vue注册实例方法，方法名$createCartAnim
createAPI(Vue, CartAnim, ['transitionend'])

// 使用自己设置的create
Vue.prototype.$create = create;

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 执行拦截起器的初始化
interceptor(app)