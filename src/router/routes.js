import Login from '@/views/login'
import Register from '@/views/register'
import Home from '@/views/home'
import Search from '@/views/search'
import Detail from '@/views/detail'
import AddCartSuccess from '@/views/addCartSuccess'
import Cart from '@/views/cart'
import Trad from '@/views/trade'
import Pay from '@/views/pay'
import PaySuccess from '@/views/paySuccess'
import Center from '@/views/center'
import MyOrder from '@/views/center/myOrder'
import GroupOrder from '@/views/center/groupOrder'

export default [{
  name: 'center',
  path: '/center',
  component: Center,
  children:[
    {
      name: 'myOrder',
      path:'myOrder',
      component: MyOrder
    },{
      name: 'groupOrder',
      path: 'groupOrder',
      component: GroupOrder
    },{
      path: '/center',
      redirect: '/center/myOrder'
    }
  ]
}, {
  name: 'paySuccess',
  path: '/paySuccess',
  component: PaySuccess
}, {
  name: 'pay',
  path: '/pay',
  component: Pay
}, {
  name: 'trad',
  path: '/trad',
  component: Trad
}, {
  name: 'cart',
  path: '/cart',
  component: Cart
}, {
  name: 'addCartSuccess',
  path: '/addCartSuccess',
  component: AddCartSuccess
}, {
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
  path: '/search/:keyword?',
  component: Search
}, {
  name: 'detail',
  path: '/detail',
  component: Detail
}, {
  path: '/',
  redirect: '/home'
}]