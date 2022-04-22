import Vue from 'vue'
import Vuex from 'vuex'

import home from './home'
import search from './search'
import detail from './detail'
import cart from './cart'
import user from './user'
import trad from './trad'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    home,
    search,
    detail,
    cart,
    user,
    trad
  }
})

export default store
