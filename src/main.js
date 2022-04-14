import Vue from 'vue'
import App from './App.vue'

import router from '@/router'
import store from '@/store'
import mock from '@/mock'

import TypeNav from '@/components/TypeNav/TypeNav'

Vue.config.productionTip = false

// 注册全局组件
Vue.component('TypeNav',TypeNav)

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
