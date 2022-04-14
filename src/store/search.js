import { reqGoodsList } from '@/api'

export default {
  state: {
    goodsData: {},
  },
  mutations: {
    SETGOODSLIST(state,list){
      state.goodsData = list
    }
  },
  actions: {
    async getGoodsList({ commit }, params) {
      let res = await reqGoodsList(params)
      if(res.code === 200){
        commit('SETGOODSLIST',res.data)
      }
    }
  },
  getters: {
    attrsList (state){
      return state.goodsData.attrsList || []
    },
    goodsList (state){
      return state.goodsData.goodsList || []
    },
    trademarkList (state){
      return state.goodsData.trademarkList || []
    },
    goodsTotal(state){
      return state.goodsData.total
    }
  }
}