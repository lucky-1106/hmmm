import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '@/components/Test.vue'
import Login from '@/views/login/Login.vue'
import Main from '@/views/main/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/test',
    component: Test
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/main',
    component: Main
  }
]

const router = new VueRouter({
  routes
})

export default router
