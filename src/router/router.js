import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = () => import('../pages/home/home')
const login = () => import('../pages/login/login')
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/forget',
      name: 'forget',
      component: login
    }
  ]
})
