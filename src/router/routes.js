import Login from '@/views/login'
import Register from '@/views/register'
import Home from '@/views/home'
import Search from '@/views/search'
import Detail from '@/views/detail'

export default [{
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