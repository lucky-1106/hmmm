<template>
  <div class="login">
    <!-- 登录框 -->
    <div class="loginbox">
      <div class="loginbox_title">
        <img src="@/assets/imgs/layout_icon.png" alt="" />
        <span>黑马面面</span>
        <span>|</span>
        <span>用户登录</span>
      </div>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginRefForm"
        class="demo-ruleForm"
      >
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input
            v-model="loginForm.phone"
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            show-password
            v-model="loginForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-row :gutter="10">
          <el-col :span="16">
            <el-form-item prop="code">
              <el-input
                v-model="loginForm.code"
                placeholder="请输入验证码"
                prefix-icon="el-icon-key"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8"
            ><img
              @click="updateCaptcha"
              :src="captchaUrl"
              alt=""
              class="captcha"
              height="40px"
          /></el-col>
        </el-row>
        <!-- 同意协议 -->
        <el-form-item prop="checked">
          <el-checkbox-group v-model="loginForm.checked">
            <el-checkbox name="checked"
              >我已阅读并同意<el-link
                type="primary"
                :underline="false"
                href="https://www.showdoc.com.cn/538567623707717"
                >用户协议</el-link
              >和<el-link
                type="primary"
                :underline="false"
                href="https://element.eleme.cn/#/zh-CN"
                >隐私条款</el-link
              ></el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          ><el-button
            type="primary"
            class="loginbtn"
            @click="login('loginRefForm')"
            >登录</el-button
          ></el-form-item
        >
        <el-form-item>
          <el-button type="success" class="loginbtn" @click="showRegister"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 登录右侧背景 -->
    <div class="loginimg">
      <a href="javascript:;"><img src="@/assets/imgs/login_bg.png" alt=""/></a>
    </div>
    <!-- 注册页面 -->
    <register v-show="registerShow"></register>
  </div>
</template>

<script>
import { setToken, getToken } from '@/utils/token'
import register from './Register'
import { loginUser } from '@/api/api'
export default {
  created () {
    if (getToken()) {
      this.$message.info('tip: 已经登录,自动跳转到首页')
      this.$router.push('/main')
    }
  },
  components: {
    register
  },
  data () {
    // 验证手机的规则
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      const regPhone = /^1[3|4|5|7|8][0-9]{9}$/
      if (regPhone.test(value)) {
        return callback()
      } else {
        callback(new Error('请输入合法的手机号'))
      }
    }
    // 验证码的规则
    var checkCaptcha = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'))
      }
      const regCaptcha = /^[0-9]{4}$/
      if (regCaptcha.test(value)) {
        return callback()
      } else {
        callback(new Error('请输入正确的验证码'))
      }
    }
    return {
      // 验证码基地址
      captchaUrl: `${process.env.VUE_APP_BASE_URL}/captcha?type=login`,
      // 表单绑定数据
      loginForm: {
        phone: '18888888888',
        password: '123456',
        code: '',
        checked: []
      },
      // 表单验证规则
      rules: {
        phone: [{ validator: checkPhone, trigger: 'blur' }],
        code: [{ validator: checkCaptcha, trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        checked: [
          {
            type: 'array',
            required: true,
            message: '请先同意协议',
            trigger: 'change'
          }
        ]
      },
      // 注册页的显示情况
      registerShow: false
    }
  },
  methods: {
    // 更新验证码
    updateCaptcha () {
      const time = +new Date()
      // console.log(time)
      this.captchaUrl =
        `${process.env.VUE_APP_BASE_URL}/captcha?type=login` + '&t=' + time
      this.$refs.loginRefForm.clearValidate(['code'])
    },
    // 登录
    login (formName) {
      // console.log(this.$axios)
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // const { data: res } = await this.$axios.post('/login', this.loginForm)
          // // console.log(res)
          // if (res.code !== 200) {
          //   return this.$message.error(res.msg)
          // }
          // this.$message.success('登录成功')
          // setToken(res.data.token)
          // this.$router.push('/main')
          // 封装登录请求
          loginUser(this.loginForm).then(res => {
            // console.log(res)
            if (res.code !== 200) {
              this.updateCaptcha()
              return this.$message.error(res.message)
            }
            this.$message.success('登录成功')
            setToken(res.data.token)
            this.$router.push('/main')
          })
        } else {
          this.$message.warning('请输入正确的提交数据')
          return false
        }
      })
    },
    // 显示注册页
    showRegister () {
      this.registerShow = true
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  min-width: 1400px;
  background: linear-gradient(225deg, #01c6fa, #1493fa);
  .loginbox {
    width: 478px;
    height: 550px;
    padding: 42px;
    border-radius: 10px;
    background: #f5f5f5;
    .loginbox_title {
      display: flex;
      align-items: center;
      height: 30px;
      margin-bottom: 22px;
      span {
        margin-left: 10px;
        &:nth-child(2) {
          font-size: 20px;
        }
      }
    }
  }
  .loginimg {
    width: 633px;
    height: 435px;
    animation: myfirst 1.5s;
    -webkit-animation: myfirst 1s; /* Safari and Chrome */
  }
  @keyframes myfirst {
    from {
      transform: translateY(-50px);
    }
    to {
      transform: translateY(0px);
    }
  }

  @-webkit-keyframes myfirst /* Safari and Chrome */ {
    from {
      transform: translateY(-50px);
    }
    to {
      transform: translateY(0px);
    }
  }
}
.captcha {
  width: 100%;
  height: 40px;
  border: 1px dotted #ccc;
  border-radius: 3px;
}
.el-link {
  vertical-align: baseline;
}
.loginbtn {
  width: 100%;
}
</style>
