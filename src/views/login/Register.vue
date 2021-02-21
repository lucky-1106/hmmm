<template>
  <div class="register">
    <!-- 注册框 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>注册用户</span>
        <el-button
          style="position: absolute; top: 10px; right: 10px"
          type="danger"
          icon="el-icon-close"
          size="mini"
          circle
          @click="close"
        ></el-button>
      </div>
      <!-- 注册表单 -->
      <el-form
        :model="registerForm"
        :rules="rules"
        ref="registerRefForm"
        class="demo-ruleForm"
      >
        <!-- 头像 -->
        <el-form-item prop="avatar" label="头像">
          <el-upload
            class="avatar-uploader"
            :action="action"
            :data="uploadObj"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            placeholder="请输入昵称"
            prefix-icon="el-icon-thumb"
          ></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item prop="email">
          <el-input
            v-model="registerForm.email"
            placeholder="请输入邮箱"
            prefix-icon="el-icon-message"
          ></el-input>
        </el-form-item>
        <!--手机 -->
        <el-form-item prop="phone">
          <el-input
            v-model="registerForm.phone"
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            show-password
            v-model="registerForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <!-- 图形码 -->
        <el-row :gutter="10">
          <el-col :span="16">
            <el-form-item prop="code">
              <el-input
                v-model="registerForm.code"
                placeholder="请输入图形码"
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
        <!-- 验证码 -->
        <el-row :gutter="10">
          <el-col :span="16">
            <el-form-item prop="rcode">
              <el-input
                v-model="registerForm.rcode"
                placeholder="请输入验证码"
                prefix-icon="el-icon-unlock"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8"><el-button @click="getRcode">获取用户验证码</el-button></el-col>
        </el-row>
        <el-form-item style="text-align: center">
          <el-button type="info" @click="resetForm">重置</el-button>
          <el-button type="primary" @click="register">确定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  mounted () {},
  data () {
    // 验证邮箱的规则
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if (regEmail.test(value)) {
        return callback()
      } else {
        callback(new Error('请输入合法的邮箱'))
      }
    }
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
        return callback(new Error('图形码不能为空'))
      }
      const regCaptcha = /^[0-9]{4}$/
      if (regCaptcha.test(value)) {
        return callback()
      } else {
        callback(new Error('请输入正确的验证码'))
      }
    }
    return {
      // 图片预览地址
      imageUrl: '',
      // 上传图片携带的参数
      uploadObj: {
        image: ''
      },
      // 上传图片地址
      action: `${process.env.VUE_APP_BASE_URL}/uploads`,
      // 图形码获取地址
      captchaUrl: `${process.env.VUE_APP_BASE_URL}/captcha?type=sendsms`,
      // 注册表单
      registerForm: {
        avatar: '',
        username: 'lucky',
        email: '123@456.com',
        phone: '18888888888',
        password: '123456',
        code: '',
        rcode: ''
      },
      // 表单验证规则
      rules: {
        avatar: [
          { required: true, message: '请上传头像', trigger: 'change' }
        ],
        username: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 10, message: '昵称长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        email: [{ validator: checkEmail, trigger: 'blur' }],
        phone: [{ validator: checkPhone, trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        code: [{ validator: checkCaptcha, trigger: 'blur' }],
        rcode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 更新验证码
    updateCaptcha () {
      const time = +new Date()
      // console.log(time)
      this.captchaUrl =
        `${process.env.VUE_APP_BASE_URL}/captcha?type=sendsms` + '&t=' + time
    },
    // 图片上传成功回调函数
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      if (res.code === 200) {
        this.registerForm.avatar = res.data.file_path
      }
    },
    // 图片上传之前回调函数
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      // 给上传参数赋值
      this.uploadObj.image = file
      return isJPG && isLt2M
    },
    // 获取用户验证码
    async getRcode () {
      let count = 0
      this.$refs.registerRefForm.validateField(['phone', 'code'], errorMessage => {
        if (!errorMessage) {
          count++
        }
      })
      // console.log(count)
      if (count === 2) {
        const { data: res } = await this.$axios.post('/sendsms', {
          phone: this.registerForm.phone,
          code: this.registerForm.code
        })
        // console.log(res)
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.registerForm.rcode = res.data.captcha
      } else {
        return this.$message.error('请输入正确的手机号和图片码')
      }
    },
    // 注册用户
    register () {
      this.$refs.registerRefForm.validate(async valid => {
        if (valid) {
          const { data: res } = await this.$axios.post('/register', this.registerForm)
          // console.log(res)
          if (res.code !== 200) {
            return this.$message.error(res.msg)
          }
          this.$message.success('注册成功哦,' + this.registerForm.username)
          this.close()
        } else {
          this.$message.warning('请输入正确的提交数据')
          return false
        }
      })
    },
    // 关闭注册组件
    close () {
      this.$parent.registerShow = false
      this.resetForm()
    },
    // 重置表单
    resetForm () {
      this.imageUrl = ''
      this.$refs.registerRefForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.register {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
}
.box-card {
  margin: 0 auto;
  width: 478px;
  height: 650px;
  border: 0;
  .clearfix {
    position: relative;
    text-align: center;
    line-height: 50px;
    color: #fff;
  }
}
.captcha {
  width: 100%;
  height: 40px;
  border: 1px dotted #ccc;
  border-radius: 3px;
}
</style>
<style>
.box-card .el-card__header {
  height: 50px;
  padding: 0;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
}
.avatar-uploader .el-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #8c939d;
  text-align: center;
}
.el-icon-plus:before {
  line-height: 100px;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
