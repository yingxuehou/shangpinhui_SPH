import {reqVerifyCode,reqRegister,reqLogin,reqUserInfo,reqLogout} from '@/api'
import {getToken,setToken,clearToken} from '@/utils/token'

export default {
  state:{
    code: '', // 验证码
    token: getToken(), // 令牌
    userInfo: {}, // 用户信息
  },
  mutations: {
    SETVERIFYCODE(state,val){
      state.code = val
    },
    SETTOKEN(state,val){
      state.token = val
    },
    SETUSERINFO(state,val){
      state.userInfo = val
    }
  },
  actions: {
    // 获取验证码
    async getVerifyCode({commit},phone){
      let res = await reqVerifyCode(phone)
      if(res.code == 200){
        commit('SETVERIFYCODE',res.data)
        return 'OK'
      }else{
        return Promise.reject(new Error('fail'))
      }
    },
    // 用户注册
    async getRegisterResult({commit},params){
      let res = await reqRegister(params)
      if(res.code == 200){
        return 'OK'
      }else{
        return Promise.reject(new Error('fail'))
      }
    },
    // 用户登陆
    async getLogin({commit},params){
      let res = await reqLogin(params)
      if(res.code == 200){
        // 本地存储token 
        setToken(res.data.token)
        commit('SETTOKEN',res.data.token)
        return "OK"
      }else{
        return Promise.reject(new Error(res.message))
      }
    },
    // 获取用户信息
    async getUserInfo({commit}){
      let res = await reqUserInfo()
      if(res.code == 200){
        commit('SETUSERINFO',res.data)
        return 'OK'
      }else{
        return Promise.reject(new Error(res.message))
      }
    },
    // 退出登陆
    async getLogout({commit}){
      let res = await reqLogout()
      if(res.code == 200){
        // 清空本地存储的 token
        clearToken()
        // state中token置为 null
        commit('SETTOKEN',null)
        // state中用户信息置为空对象
        commit('SETUSERINFO',{})
        return 'OK'
      }else{
        return Promise.reject(new Error(res.message))
      }
    }
  },
  getters: {
    
  }
}