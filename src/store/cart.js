import {reqCartList,reqChangeChecked} from '@/api'
export default {
  state: {
    cartInfo: []
  },
  mutations: {
    SETCARTINFO(state, val){
      state.cartInfo = val
    }
  },
  actions: {
    // 获取购物车列表数据
    async getCartInfo({commit},obj){
      const res = await reqCartList()
      if(res.code == 200){
        commit('SETCARTINFO', res.data)
      }
    },
    // 修改单个商品选中状态
    async setChecked(context,params){
      const res = await reqChangeChecked(params)
      if(res.code == 200){
        return 'OK'
      }else{
        return Promise.reject(new Error('fail'))
      }
    },
    // 修改所有商品的选中状态（全选、全不选）
    setAllGoodsChecked({dispatch,getters},status){
      let promistArr = []
      getters.cartInfoList.forEach((cart)=>{
        const singleP = dispatch('setChecked',{skuID:cart.skuId,isChecked:status})
        promistArr.push(singleP)
      })
      return Promise.all(promistArr)
    }
  },
  getters: {
    cartInfoList(state){
      return state.cartInfo.length ? state.cartInfo[0].cartInfoList : []
    }
  }
}