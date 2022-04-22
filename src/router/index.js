import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import store from '@/store'

Vue.use(VueRouter)

// 开始重写push方法
// 1.保存一份原始的push方法
const originPush = VueRouter.prototype.push

// 2.重写push方法
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
})
/**
 * 路由守卫中的逻辑：
 * 
 * 已登录（vuex中有token）：
 *  1.如果要去登录页——不行，直接放行到home页
 *  2.如果不去登录页——如果vuex中没有用户名（页面刷新后，vuex中数据丢失的情况）——拿着token去获取用户信息
 *    2.1 用户信息获取成功——放行
 *    2.2 用户信息获取失败——token过期（即登陆过期），清空本地和vuex中的token（即退出登陆操作），放行到登录页去重新登陆
 * 
 * 未登录（vuex中没有token）
 *  暂时全部放行
 * 
 */
router.beforeEach(async (to,from,next)=>{
  let token = store.state.user.token
  if(token){//已登录
    if(to.path=="/login"){
      next('/home')
    }else{ // 跳转到除登陆页面的其他页面——头部都需要展示用户信息（用户名）
      let nickName = store.state.user.userInfo.nickName
      if(!nickName){ // 没有用户名——刷新后vuex数据丢失所导致
        try {
          // 获取用户信息成功
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // 获取用户信息失败——登陆过期——清空本地token、清空vuex中token和用户信息，重新登陆
          try {
            await store.dispatch('getLogout')
            next('/login')
          } catch (error) {
            alert("退出登陆失败")
          }
        }
      }else{
        next()
      }
    }
  }else{//未登录
    next()
  }
})

export default router