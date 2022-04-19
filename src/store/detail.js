import {reqGoodsInfo,reqAddToCart} from '@/api/index'

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
    },
    async addToCart(state,params){
      try {
        const res = await reqAddToCart(params)
        return 'OK'
      } catch (error) {
        return Promise.reject(new Error('fail'))
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
    },
  }
}