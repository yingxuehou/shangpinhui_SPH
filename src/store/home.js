import { reqCategoryList } from '@/api'

const home = {
  state: {
    categoryList: []
  },
  mutations: {
    SETCATEGORYLIST(state, list) {
      state.categoryList = list
    }
  },
  actions: {
    async getCategoryList({ commit }) {
      let result = await reqCategoryList()
      commit('SETCATEGORYLIST', result.data)
    }
  },
  getters: {}
}

export default home