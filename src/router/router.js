import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('../pages/home/home')
const Login = () => import('../pages/login/login')
const Forget = () => import('../pages/forget/forget')
const Profile = () => import('../pages/profile/profile')
const City = () => import('../pages/city/city')
const Msite = () => import('../pages/msite/msite')
const Search = () => import('../pages/search/search')
const Order = () => import('../pages/order/order')
const Food = () => import('../pages/food/food')
const Shop = () => import('../pages/shop/shop')
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'home1',
      component: Home
    },
    {
      path: '/city/:id',
      name: 'city',
      component: City
    },
    {
      path: '/msite',
      name: 'msite',
      component: Msite
    },
    {
      path: '/food',
      name: 'food',
      component: Food
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ]
})
