import { reqAddressList,reqOrderDetail } from '@/api'

export default {
  state:{
    addressList: [],
    orderDetailInfo: {}
  },
  mutations: {
    SETADDRESSLIST(state,val){
      state.addressList = val
    },
    SETORDERDETAIL(state,val){
      state.orderDetailInfo = val
    }
  },
  actions: {
    // 获取地址信息
    async getAddressList({commit}){
      let res = await reqAddressList()
      if(res.code == 200){
        commit('SETADDRESSLIST',res.data)
      }
    },
    // 获取订单交易页面订单信息
    async getOrderDetail({commit}){
      let res = await reqOrderDetail()
      if(res.code == 200){
        commit('SETORDERDETAIL',res.data)
      }
    }
  },
  getters: {
    orderDetailList(state){
      return state.orderDetailInfo.detailArrayList || []
    }
  }
}