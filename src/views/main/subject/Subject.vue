<template>
  <div class="user">
    <el-card>
      <!-- 查询学科模块 -->
      <el-form
        :inline="true"
        :model="subjectFrom"
        ref="subjectFrom"
        class="demo-form-inline"
      >
        <el-form-item label="学科编号" prop="rid">
          <el-input
            v-model="subjectFrom.rid"
            placeholder="请输入学科编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input
            v-model="subjectFrom.name"
            placeholder="请输入学科名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input
            v-model="subjectFrom.username"
            placeholder="请输入创建者"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="subjectFrom.status" placeholder="选择学科状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getSubjectList">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="onReset">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="addSubject">+添加学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <!-- 学科列表 -->
      <el-table :data="subjectList" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column prop="rid" label="学科编号" width="100"></el-table-column>
        <el-table-column prop="name" label="学科名称" width="150"></el-table-column>
        <el-table-column prop="short_name" label="简称" width="150"></el-table-column>
        <el-table-column prop="username" label="创建者" width="100"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="200"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="slotProps">
            <el-tag v-if="slotProps.row.status === 1" type="success"
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
            <el-button type="primary" @click="editSubject(slotProps.row)">编辑</el-button
            >
            <el-button type="danger" @click="removeSubject(slotProps.row.id)"
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
    </el-card>
    <!-- 添加和编辑对话框 -->
    <ae-subject ref="aeSubject" @refresh='getSubjectList' :mode="mode" :formData="editData"></ae-subject>
  </div>
</template>

<script>
import aeSubject from './aeSubject'
export default {
  created () {
    this.getSubjectList()
  },
  components: {
    aeSubject
  },
  data () {
    return {
      // 顶部搜索表单绑定数据
      subjectFrom: {
        name: '',
        rid: '',
        username: '',
        status: ''
      },
      // 选项数据
      options: [
        { value: 0, label: '禁用' },
        { value: 1, label: '启用' }
      ],
      // 用户列表
      subjectList: [],
      // 用户列表请求参数
      tableQuery: {
        page: 1,
        limit: 5
      },
      total: 0,
      // 判断新增还是编辑
      mode: 0,
      editData: {}
    }
  },
  methods: {
    // 获取学科列表
    async getSubjectList () {
      const res = await this.$axios.get('/subject/list', {
        params: { ...this.subjectFrom, ...this.tableQuery }
      })
      // console.log(res)
      if (res.code !== 200) {
        return this.$message.error(res.message)
      }
      this.subjectList = res.data.items
      this.total = res.data.pagination.total
    },
    // 重置表单
    onReset () {
      this.$refs.subjectFrom.resetFields()
      this.getSubjectList()
    },
    // 修改学科状态
    async setStatus (id) {
      const res = await this.$axios.post('/subject/status', { id: id })
      // console.log(res)
      if (res.code !== 200) {
        return this.$message.error(res.message)
      }
      this.$message.success('修改学科状态成功')
      this.getSubjectList()
    },
    // 改变每条显示页数
    handleSizeChange (val) {
      this.tableQuery.limit = val
      this.getSubjectList()
    },
    // 改变当前所在页数
    handleCurrentChange (val) {
      this.tableQuery.page = val
      this.getSubjectList()
    },
    // 删除用户
    removeSubject (id) {
      this.$confirm('确认要删除该学科', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '放弃'
      }).then(async () => {
        const res = await this.$axios.post('/subject/remove', { id: id })
        // console.log(res)
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.$message.success('删除成功')
        if (this.subjectList.length === 1) { this.tableQuery.page-- }
        this.getSubjectList()
      }).catch(() => {
        this.$message.info('取消删除')
      })
    },
    // 新增学科
    addSubject () {
      this.$refs.aeSubject.dialogVisible = true
      this.mode = 0
    },
    // 编辑学科
    editSubject (row) {
      this.mode = 1
      // 搜索框渲染完毕加载数据
      this.editData = row
      this.$refs.aeSubject.dialogVisible = true
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
.dialog-title {
  color: #fff;
}
.demo-form-inline .el-input,
.demo-form-inline .el-select {
  width: 150px;
}
</style>
