import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '@/components/Test.vue'
import Login from '@/views/login/Login.vue'
import Main from '@/views/main/Main.vue'
import Chart from '@/views/main/chart/Chart.vue'
import Enterprise from '@/views/main/enterprise/Enterprise.vue'
import User from '@/views/main/user/User.vue'
import Question from '@/views/main/question/Question.vue'
import Subject from '@/views/main/subject/Subject.vue'
import { getToken } from '@/utils/token'

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
    redirect: '/main/chart',
    component: Main,
    children: [
      {
        path: '/main/chart',
        component: Chart
      },
      {
        path: '/main/enterprise',
        component: Enterprise
      },
      {
        path: '/main/user',
        component: User
      },
      {
        path: '/main/subject',
        component: Subject
      },
      {
        path: '/main/question',
        component: Question
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = getToken()
    // console.log(token)
    if (token) {
      // 有权限
      next()
    } else {
      // 没有权限
      next('/login')
    }
  }
})

export default router
