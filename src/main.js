import Vue from 'vue'
import App from './App.vue'

import router from '@/router'
import store from '@/store'

import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'

Vue.config.productionTip = false

Vue.component('Header',Header)
Vue.component('Footer',Footer)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
