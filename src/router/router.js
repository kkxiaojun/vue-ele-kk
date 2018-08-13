import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = () => import('../pages/home/home')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    }
  ]
})
