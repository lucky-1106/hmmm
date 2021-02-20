<template>
  <div class="login">
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
        <el-form-item prop="phone">
          <el-input
            v-model="loginForm.phone"
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="18">
            <el-form-item prop="code">
              <el-input
                v-model="loginForm.code"
                placeholder="请输入验证码"
                prefix-icon="el-icon-key"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6"
            ><img src="http://159.75.11.233/heimamm/public/captcha?type=login" alt="" class="captcha" width="100%" height="40px"
          /></el-col>
        </el-row>
        <el-form-item>
          <el-checkbox-group v-model="loginForm.checked" >
            <el-checkbox>我已阅读并同意<el-link type="primary" :underline="false" href="https://www.showdoc.com.cn/538567623707717">用户协议</el-link>和<el-link type="primary" :underline="false" href="https://element.eleme.cn/#/zh-CN">隐私条款</el-link></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
          <el-button type="primary" class="loginbtn">登录</el-button>
        <el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button type="success" class="loginbtn">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="loginimg">
      <a href="javascript:;"><img src="@/assets/imgs/login_bg.png" alt=""/></a>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {},
  data () {
    return {
      loginForm: {
        phone: '',
        password: '',
        code: '',
        checked: false
      },
      rules: {}
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: space-around;
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
  border: 1px dotted #ccc
}
.el-link {
  vertical-align: baseline;
}
.loginbtn {
  width: 100%;
}
</style>
