import Login from '@/views/login'
import Register from '@/views/register'
import Home from '@/views/home'
import Search from '@/views/search'
import Detail from '@/views/detail'
import AddCartSuccess from '@/views/addCartSuccess'
import Cart from '@/views/cart'
import Trad from '@/views/trade'

export default [{
  name: 'trad',
  path: '/trad',
  component: Trad
},{
  name: 'cart',
  path: '/cart',
  component: Cart
},{
  name: 'addCartSuccess',
  path: '/addCartSuccess',
  component: AddCartSuccess
},{
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
},{
  name:'detail',
  path:'/detail',
  component: Detail
}, {
  path: '/',
  redirect: '/home'
}]