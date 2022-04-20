// 引入uuid工具函数
import { getToken } from '@/utils/uuidTools'
import {reqGoodsInfo,reqAddToCart} from '@/api/index'

export default {
  state: {
    goodsInfo:{},
    token: localStorage.getItem('uuidToken') ? localStorage.getItem('uuidToken') : getToken()
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
    // 添加到购物车 或 修改购物车中商品数量
    async addToCart(state,params){
        const res = await reqAddToCart(params)
        if(res.code == 200){
          return 'OK'
        }else{
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