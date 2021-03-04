<template>
  <el-container class="main">
    <!-- 头部 -->
    <el-header>
      <div class="logo">
        <i :class="foldIcon" @click="changeFold"></i>
        <img src="@/assets/imgs/login_icon.png" alt="" />
        <span>黑马面面</span>
      </div>
      <div class="infoandlogout">
        <el-avatar :size="40" :src="$store.state.avatar"></el-avatar>
        <i>{{ $store.state.username }}</i
        >,欢迎！
        <el-button class="logout" @click="logout" type="danger"
          >退出登录</el-button
        >
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="auto">
        <el-menu
          :default-active="isActivePath"
          class="el-menu-vertical-demo"
          :collapse="isFold"
          :collapse-transition="false"
          router
        >
          <el-menu-item index="/main/chart">
            <i class="el-icon-s-data"></i>
            <span slot="title">数据预览</span>
          </el-menu-item>
          <el-menu-item index="/main/user">
            <i class="el-icon-user-solid"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/main/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/main/question">
            <i class="el-icon-s-order"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/main/subject">
            <i class="el-icon-notebook-1"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { removeToken } from '@/utils/token'
export default {
  created () {
    this.getUserInfo()
    this.isActivePath = window.location.hash.slice(1)
    // console.log(this.$store.state)
    // console.log(this.isActivePath)
  },
  data () {
    return {
      // 当前路径
      isActivePath: '',
      // 用户信息
      // userInfo: {},
      // 折叠状态
      isFold: false,
      // 折叠图标名
      foldIcon: 'el-icon-s-fold'
    }
  },
  methods: {
    // 获取登陆用户信息
    async getUserInfo () {
      const res = await this.$axios.get('/info')
      // console.log(res)
      if (res.code !== 200) {
        return this.$message.error(res.message)
      }
      // 设置初始用户状态
      const avatarHead = process.env.VUE_APP_BASE_URL + '/' + res.data.avatar
      this.$store.commit('setUserName', res.data.username)
      this.$store.commit('setAvatar', avatarHead)
      this.$store.commit('setUserId', res.data.id)
    },
    // 退出登录
    logout () {
      this.$confirm('壮士可否留下?', '提示', {
        confirmButtonText: '去意已决',
        cancelButtonText: '留下看看',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$axios.get('/logout')
          // console.log(res)
          if (res.code !== 200) {
            return this.$message.error(res.message)
          }
          this.$message.success('居然让你溜了')
          removeToken()
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '就知道你还想赖在这里'
          })
        })
    },
    changeFold () {
      !this.isFold
        ? (this.foldIcon = 'el-icon-s-unfold')
        : (this.foldIcon = 'el-icon-s-fold')
      this.isFold = !this.isFold
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: rgb(250, 250, 250);
}
.el-aside {
  background-color: #fff;
  .el-menu-item {
    padding: 0 60px;
  }
}
.el-main {
  background-color: rgb(240, 240, 240);
}
.logo {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 10px 0;
  img {
    height: 80%;
    margin: 0 10px;
  }
  span,
  i {
    font-size: 24px;
    color: #0094ff;
  }
}
.infoandlogout {
  display: flex;
  align-items: center;
  color: #333;
  i {
    font-style: normal;
    margin: 0px 10px;
  }
  .logout {
    width: 100px;
  }
}
</style>
