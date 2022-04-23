import Vue from 'vue'
import App from './App.vue'

import router from '@/router'
import store from '@/store'
import mock from '@/mock'

import TypeNav from '@/components/TypeNav/TypeNav'
import * as API from '@/api'

import { Button,MessageBox } from 'element-ui';


Vue.use(Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false

// 注册全局组件
Vue.component('TypeNav',TypeNav)

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    Vue.prototype.$bus = this
    Vue.prototype.$api = API
  }
}).$mount('#app')
