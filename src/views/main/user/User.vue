<template>
  <div class="user">
    <el-card>
      <!-- 查询模块 -->
      <el-form
        :inline="true"
        :model="userFrom"
        ref="userRef"
        class="demo-form-inline"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input
            v-model="userFrom.username"
            placeholder="请输入用户名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input
            v-model="userFrom.email"
            placeholder="请输入用户邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="userFrom.role_id" placeholder="选择用户角色">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="onReset">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="dialogVisible = true"
            >+添加用户</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <!-- 用户列表 -->
      <el-table :data="userList" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="150">
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="150">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="150">
        </el-table-column>
        <el-table-column label="角色">
          <template v-slot="slotProps">
            <el-tag v-if="slotProps.row.role_id === 1" effect="dark">超级管理员</el-tag>
            <el-tag type="success" v-else-if="slotProps.row.role_id === 2" effect="dark">管理员</el-tag>
            <el-tag type="warning" v-else-if="slotProps.row.role_id === 3" effect="dark">老师</el-tag>
            <el-tag type="danger" v-else effect="dark">学生</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
          <template v-slot="slotProps">
            <span v-if="slotProps.row.remark !== ''">{{
              slotProps.row.remark
            }}</span>
            <span v-else>暂无备注</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template v-slot="slotProps">
            <el-tag
              v-if="slotProps.row.status === 1"
              type="success"
              >启用</el-tag
            >
            <el-tag v-else type="danger">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template v-slot="slotProps">
            <el-button
              type="warning"
              v-if="slotProps.row.status === 1"
              @click="setStatus(slotProps.row.id)"
              >禁用</el-button
            >
            <el-button
              type="success"
              v-else
              @click="setStatus(slotProps.row.id)"
              >启用</el-button
            >
            <el-button type="primary" @click="getEditUserInfo(slotProps.row)"
              >编辑</el-button
            >
            <el-button type="danger" @click="onRemoveUser(slotProps.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableQuery.page"
        :page-sizes="[3, 4, 5, 6]"
        :page-size="tableQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 后台添加用户 -->
      <el-dialog
        :visible.sync="dialogVisible"
        close-on-press-escape
        width="40%"
        @closed="resetForm"
      >
        <span slot="title" class="dialog-title">新增用户</span>
        <!-- 添加用户表单 -->
        <el-form
          :model="addUserForm"
          :rules="rules"
          ref="addUserForm"
          class="demo-ruleForm"
          label-width="70px"
        >
          <!-- 用户名 -->
          <el-form-item prop="username" label="用户名">
            <el-input
              v-model="addUserForm.username"
              prefix-icon="el-icon-thumb"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item prop="email" label="email">
            <el-input
              v-model="addUserForm.email"
              placeholder="请输入邮箱"
              prefix-icon="el-icon-message"
            ></el-input>
          </el-form-item>
          <!--手机 -->
          <el-form-item prop="phone" label="电话">
            <el-input
              v-model="addUserForm.phone"
              placeholder="请输入手机号"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <!-- 角色 -->
          <el-form-item label="角色" prop="role_id">
            <el-select v-model="addUserForm.role_id" placeholder="选择用户角色">
              <el-option label="超级管理员" value="1"></el-option>
              <el-option label="管理员" value="2"></el-option>
              <el-option label="老师" value="3"></el-option>
              <el-option label="学生" value="4"></el-option>
            </el-select>
          </el-form-item>
          <!-- 状态 -->
          <el-form-item label="状态" prop="status">
            <el-select v-model="addUserForm.status" placeholder="选择用户角色">
              <el-option label="禁用" value="0"></el-option>
              <el-option label="启用" value="1"></el-option>
            </el-select>
          </el-form-item>
          <!--用户备注 -->
          <el-form-item prop="remark" label="用户备注">
            <el-input
              v-model="addUserForm.remark"
              placeholder="输入用户备注"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="info" @click="resetForm">重 置</el-button>
          <el-button type="primary" @click="onAddUser">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑用户 -->
      <el-dialog
        :visible.sync="editDlVisible"
        close-on-press-escape
        width="50%"
      >
        <span slot="title" class="dialog-title">编辑用户</span>
        <!-- 编辑表单 -->
        <el-form
          :model="editUserForm"
          :rules="rules"
          ref="editUserForm"
          class="demo-ruleForm"
          label-width="70px"
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
          <!-- 用户名 -->
          <el-form-item prop="username" label="用户名">
            <el-input
              v-model="editUserForm.username"
              prefix-icon="el-icon-thumb"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item prop="email" label="email">
            <el-input
              v-model="editUserForm.email"
              placeholder="请输入邮箱"
              prefix-icon="el-icon-message"
            ></el-input>
          </el-form-item>
          <!-- 手机 -->
          <el-form-item prop="phone" label="电话">
            <el-input
              v-model="editUserForm.phone"
              placeholder="请输入手机号"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password" label="密码">
            <el-input
              show-password
              v-model="editUserForm.password"
              placeholder="请输入要修改的密码"
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <!-- 角色 -->
          <el-form-item label="角色" prop="role_id">
            <el-select
              v-model="editUserForm.role_id"
              placeholder="选择用户角色"
            >
              <el-option label="超级管理员" :value="1"></el-option>
              <el-option label="管理员" :value="2"></el-option>
              <el-option label="老师" :value="3"></el-option>
              <el-option label="学生" :value="4"></el-option>
            </el-select>
          </el-form-item>
          <!-- 状态 -->
          <el-form-item label="状态" prop="status">
            <el-select v-model="editUserForm.status" placeholder="选择用户角色">
              <el-option label="禁用" :value="0"></el-option>
              <el-option label="启用" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <!--用户备注 -->
          <el-form-item prop="remark" label="用户备注">
            <el-input
              v-model="editUserForm.remark"
              placeholder="输入用户备注"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="info" @click="resetEditForm">重 置</el-button>
          <el-button type="primary" @click="editUser">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  created () {
    this.getUserList()
  },
  data () {
    return {
      // 顶部表单绑定数据
      userFrom: {
        username: '',
        email: '',
        role_id: ''
      },
      // 用户列表
      userList: [],
      // 用户列表请求参数
      tableQuery: {
        page: 1,
        limit: 4
      },
      // 用户总数
      total: 0,
      // 对话框显示情况
      dialogVisible: false,
      editDlVisible: false,
      // 添加用户表单绑定值
      addUserForm: {
        username: 'lucky007',
        email: '135@246.com',
        phone: '15555555555',
        role_id: '4',
        status: '1',
        remark: '赖棋是帅哥'
      },
      editUserForm: {},
      // 图片预览地址
      imageUrl: '',
      // 上传图片携带的参数
      uploadObj: {
        image: ''
      },
      // 上传图片地址
      action: `${process.env.VUE_APP_BASE_URL}/uploads`,
      // 表单规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '昵称长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[3|4|5|7|8][0-9]{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        role_id: [{ required: true, message: '请选择角色', trigger: 'change' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }],
        password: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback()
              }
              const regpsd = /^[0-9A-Za-z]{6,16}$/
              // console.log(value)
              // console.log(regpsd.test(value))
              if (regpsd.test(value)) {
                return callback()
              } else {
                callback(
                  new Error('请输入正确格式的密码(只能由数字和字母组成)')
                )
              }
            },
            trigger: 'blur'
          }
        ],
        avatar: [{ required: true, message: '请上传头像', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 获取用户列表
    async getUserList () {
      const res = await this.$axios.get('/user/list', {
        params: { ...this.userFrom, ...this.tableQuery }
      })
      // console.log(res)
      if (res.code !== 200) {
        return this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
      this.userList = res.data.items
      this.total = res.data.pagination.total
    },
    // 查询符合条件用户
    onSubmit () {
      this.getUserList()
    },
    // 重置表单
    onReset () {
      this.$refs.userRef.resetFields()
      // console.log('重置')
      this.getUserList()
    },
    // 添加用户
    onAddUser () {
      this.$refs.addUserForm.validate(async valid => {
        if (valid) {
          const res = await this.$axios.post('/user/add', this.addUserForm)
          // console.log(res)
          if (res.code !== 200) {
            return this.$message({
              showClose: true,
              message: res.message,
              type: 'error'
            })
          }
          this.$message.success('添加用户成功')
          this.dialogVisible = false
          this.getUserList()
        } else {
          console.log('请填写正确的提交格式!!')
          return false
        }
      })
    },
    // 重置添加用户form表单
    resetForm () {
      this.$refs.addUserForm.resetFields()
    },
    // 重置编辑用户form表单
    resetEditForm () {
      this.$refs.editUserForm.resetFields()
    },
    // 关闭对话框的回调函数
    // closeDialog () {
    //   this.resetForm()
    // },
    // 删除用户
    onRemoveUser (id) {
      this.$confirm('确认要删除该用户', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '放弃'
      })
        .then(async () => {
          const res = await this.$axios.post('/user/remove', {
            id: id
          })
          console.log(res)
          if (res.code !== 200) {
            return this.$message({
              showClose: true,
              message: res.message,
              type: 'error'
            })
          }
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getUserList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消成功'
          })
        })
    },
    // 修改用户状态
    async setStatus (id) {
      const res = await this.$axios.post('/user/status', {
        id: id
      })
      // console.log(res)
      if (res.code !== 200) {
        return this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
      this.$message({
        type: 'success',
        message: '修改状态成功'
      })
      this.getUserList()
    },
    // 改变每条显示页数
    handleSizeChange (val) {
      this.tableQuery.limit = val
      this.getUserList()
    },
    // 改变当前所在页数
    handleCurrentChange (val) {
      this.tableQuery.page = val
      this.getUserList()
    },
    // 获取编辑用户信息
    async getEditUserInfo (row) {
      this.editUserForm = JSON.parse(JSON.stringify(row))
      this.editDlVisible = true
      this.imageUrl =
        process.env.VUE_APP_BASE_URL + '/' + this.editUserForm.avatar
      // console.log(this.imageUrl)
      // console.log(this.editUserForm)
    },
    // 图片上传成功回调函数
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      if (res.code === 200) {
        this.editUserForm.avatar = res.data.file_path
        this.$refs.editUserForm.validateField(['avatar'])
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
    // 提交编辑的用户
    editUser () {
      this.$refs.editUserForm.validate(async valid => {
        if (valid) {
          const res = await this.$axios.post('/user/edit', this.editUserForm)
          // console.log(res)
          if (res.code !== 200) {
            return this.$message({
              showClose: true,
              message: res.message,
              type: 'error'
            })
          }
          this.$message.success('编辑用户成功')
          // 改变原登录用户状态
          if (this.editUserForm.id === this.$store.state.id) {
            const avatarHead =
              process.env.VUE_APP_BASE_URL + '/' + this.editUserForm.avatar
            this.$store.commit('setUserName', this.editUserForm.username)
            this.$store.commit('setAvatar', avatarHead)
          }
          this.editDlVisible = false
          this.editUserForm = {}
          this.imageUrl = ''
          this.getUserList()
        } else {
          console.log('请填写正确的提交格式!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user {
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
}
.box-card {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 20px;
}
.dialog-title {
  color: #fff;
}
</style>
