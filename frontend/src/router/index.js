import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/auth/Signup.vue')
  },
  {
    path: '/profile',
    name: 'userProfile',
    component: () => import('../views/user.vue')
  },
  {
    path: '/feed',
    name: 'feed',
    component: () => import('../views/feed.vue')
  },
  {
    path: '/adminBoard',
    name: 'adminBoard',
    component: () => import('../views/adminBoard')
  }
]

const router = new VueRouter({
  routes
})

export default router
