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
const ShopDetail = () => import('../pages/shop/children/shopDetail')
const FoodDetail = () => import('../pages/shop/children/foodDetail')
const ConfirmOrder = () => import('../pages/confirmOrder/confirmOrder')
const ChooseAddress = () => import('../pages/confirmOrder/children/chooseAddress')
const AddAddress = () => import('../pages/confirmOrder/children/children/addAddress')
const SearchAddress = () => import('../pages/confirmOrder/children/children/children/searchAddress')
const Remarks = () => import('../pages/confirmOrder/children/remarks')
const Payment = () => import('../pages/confirmOrder/children/payment')
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
      component: Shop,
      children: [
        {
          path: 'shopDetail',
          name: 'shopDetail',
          component: ShopDetail
        },
        {
          path: 'foodDetail',
          name: 'foodDetail',
          component: FoodDetail
        }
      ]
    },
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: ConfirmOrder,
      children: [
        {
          path: 'chooseAddress',
          name: 'chooseAddress',
          component: ChooseAddress,
          children: [
            {
              path: 'addAddress',
              name: 'addAddress',
              component: AddAddress,
              children: [
                {
                  path: 'searchAddress',
                  name: 'searchAddress',
                  component: SearchAddress,
                  
                }
              ]
            }
          ]
        },
        {
          path: 'remarks',
          name: 'remarks',
          component: Remarks
        },
        {
          path: 'payment',
          name: 'payment',
          component: Payment
        }
      ]
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
