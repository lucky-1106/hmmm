<template>
  <div class="user">
    <el-card>
      <el-form :inline="true" :model="userFrom" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input
            v-model="userFrom.username"
            placeholder="请输入用户名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input
            v-model="userFrom.email"
            placeholder="请输入用户邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="userFrom.role_id" placeholder="选择用户角色">
            <el-option label="管理员" value="shanghai"></el-option>
            <el-option label="老师" value="beijing"></el-option>
            <el-option label="学生" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="onReset">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="onAddUser">+添加用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
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
            <el-tag>{{ slotProps.row.role }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="slotProps">
            <el-tag
              v-if="slotProps.row.status === 1"
              type="success"
              effect="dark"
              >启用</el-tag
            >
            <el-tag v-else type="error" effect="dark">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <el-button type="warning">禁用</el-button>
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </el-table-column>
      </el-table>
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
      total: 0
    }
  },
  methods: {
    // 获取用户列表
    async getUserList () {
      const { data: res } = await this.$axios.get('/user/list', {
        params: this.tableQuery
      })
      console.log(res)
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
    onSubmit () {},
    // 重置表单
    onReset () {},
    // 添加用户
    onAddUser () {},
    // 改变每条显示页数
    handleSizeChange (val) {
      this.tableQuery.limit = val
      this.getUserList()
    },
    // 改变当前所在页数
    handleCurrentChange (val) {
      this.tableQuery.page = val
      this.getUserList()
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 20px;
}
</style>
