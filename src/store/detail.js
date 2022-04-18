import {reqGoodsInfo} from '@/api/index'

export default {
  state: {
    goodsInfo:{}
  },
  mutations: {
    SETGOODSINFO(state,value){
      state.goodsInfo =value
    }
  },
  actions: {
    async getGoodsInfo({commit},skuId){
      let res = await reqGoodsInfo(skuId)
      if(res.code === 200){
        commit('SETGOODSINFO',res.data)
      }
    }
  },
  getters: {
    categoryView(state){
      return state.goodsInfo.categoryView || {}
    },
    skuInfo(state){
      return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
      return state.goodsInfo.spuSaleAttrList || []
    }
  }
}