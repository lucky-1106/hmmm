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
// 进度条
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/test',
    component: Test,
    meta: {
      title: '黑马面面-测试'
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '黑马面面-登录'
    }
  },
  {
    path: '/main',
    redirect: '/main/chart',
    component: Main,
    meta: {
      title: '黑马面面-首页'
    },
    children: [
      {
        path: '/main/chart',
        component: Chart,
        meta: {
          title: '黑马面面-数据分析',
          name: '数据预览'
        }
      },
      {
        path: '/main/enterprise',
        component: Enterprise,
        meta: {
          title: '黑马面面-企业',
          name: '企业列表'
        }
      },
      {
        path: '/main/user',
        component: User,
        meta: {
          title: '黑马面面-用户',
          name: '用户列表'
        }
      },
      {
        path: '/main/subject',
        component: Subject,
        meta: {
          title: '黑马面面-学科',
          name: '学科列表'
        }
      },
      {
        path: '/main/question',
        component: Question,
        meta: {
          title: '黑马面面-题目',
          name: '题目列表'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航全局前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
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
// 路由导航全局后置守卫
router.afterEach((to) => {
  document.title = to.meta.title
  setTimeout(() => {
    // 关闭进度条
    NProgress.done()
  }, 500)
})

export default router
