import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'
import Register from '@/views/register'
import Home from '@/views/home'
import Search from '@/views/search'

Vue.use(VueRouter)

// 开始重写push方法
// 1.保存一份原始的push方法
const originPush = VueRouter.prototype.push

// 2.重写push方法
VueRouter.prototype.push = function(location,resolve,reject){
  if(resolve && reject){
    originPush.call(this,location,resolve,reject)
  }else{
    originPush.call(this,location,()=>{},()=>{})
  }
}

const router = new VueRouter({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  }, {
    name: 'register',
    path: '/register',
    component: Register
  }, {
    name: 'home',
    path: '/home',
    component: Home
  }, {
    name: 'search',
    path: '/search',
    component: Search
  }, {
    path: '/',
    redirect: '/home'
  }]
})

export default router