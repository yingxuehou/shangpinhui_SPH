import { reqCategoryList, reqBannerList, reqFloorData } from '@/api'

const home = {
  state: {
    categoryList: [],
    bannerList: [],
    floorList: []
  },
  mutations: {
    SETCATEGORYLIST(state, list) {
      state.categoryList = list
    },
    SETBANNERLIST(state, list){
      state.bannerList = list
    },
    SETFLOORLIST(state, list){
      state.floorList = list
    }
  },
  actions: {
    async getCategoryList({ commit }) {
      let result = await reqCategoryList()
      commit('SETCATEGORYLIST', result.data)
    },

    async getBannerList({ commit }){
      let res = await reqBannerList()
      if(res.code === 200){
        commit('SETBANNERLIST',res.data)
      }
    },

    async getFloorList({ commit }){
      let res = await reqFloorData()
      if(res.code === 200){
        commit('SETFLOORLIST',res.data)
      }
    }
  },
  getters: {}
}

export default home