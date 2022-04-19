import Vue from 'vue'
import Vuex from 'vuex'

import home from './home'
import search from './search'
import detail from './detail'
import cart from './cart'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    home,
    search,
    detail,
    cart
  }
})

export default store
