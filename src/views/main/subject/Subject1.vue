<template>
  <div class="subject">
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
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
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
            >+添加学科</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <!-- 学科列表 -->
      <el-table :data="subjectList" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column prop="rid" label="学科编号" width="100">
        </el-table-column>
        <el-table-column prop="name" label="学科名称" width="150">
        </el-table-column>
        <el-table-column prop="short_name" label="简称" width="150">
        </el-table-column>
        <el-table-column prop="username" label="创建者" width="100">
        </el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="200">
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
            <el-button type="primary" @click="getEditSubjectInfo(slotProps.row)"
              >编辑</el-button
            >
            <el-button type="danger" @click="onRemoveSubject(slotProps.row.id)"
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
      <!-- 添加学科 -->
      <el-dialog
        :visible.sync="dialogVisible"
        close-on-press-escape
        width="30%"
        @closed="resetForm"
      >
        <span slot="title" class="dialog-title">新增学科</span>
        <!-- 添加学科表单 -->
        <el-form
          :model="addSubjectForm"
          :rules="rules"
          ref="addSubjectForm"
          class="demo-ruleForm"
          label-width="80px"
        >
          <!-- 学科编号 -->
          <el-form-item prop="rid" label="学科编号">
            <el-input
              v-model="addSubjectForm.rid"
              placeholder="请输入学科编号"
            ></el-input>
          </el-form-item>
           <!-- 学科名称 -->
          <el-form-item prop="name" label="学科名称">
            <el-input
              v-model="addSubjectForm.name"
              placeholder="请输入学科名称"
            ></el-input>
          </el-form-item>
           <!-- 学科简称 -->
          <el-form-item prop="short_name" label="学科简称">
            <el-input
              v-model="addSubjectForm.short_name"
              placeholder="请输入学科简称"
            ></el-input>
          </el-form-item>
          <!-- 学科简介 -->
          <el-form-item prop="intro" label="学科简介">
            <el-input
              v-model="addSubjectForm.intro"
              placeholder="请输入学科简介"
            ></el-input>
          </el-form-item>
          <!-- 状态 -->
          <el-form-item label="状态" prop="status">
            <el-select v-model="addSubjectForm.status" placeholder="选择学科状态">
              <el-option label="禁用" :value="0"></el-option>
              <el-option label="启用" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <!-- 学科备注 -->
          <el-form-item prop="remark" label="学科备注">
            <el-input
              v-model="addSubjectForm.remark"
              placeholder="请输入学科备注"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="info" @click="resetForm">重 置</el-button>
          <el-button type="primary" @click="onAddSubject">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑学科 -->
      <el-dialog
        :visible.sync="editDlVisible"
        close-on-press-escape
        width="30%"
      >
        <span slot="title" class="dialog-title">编辑学科</span>
        <!-- 编辑表单 -->
        <el-form
          :model="editSubjectForm"
          :rules="rules"
          ref="editSubjectForm"
          class="demo-ruleForm"
          label-width="80px"
        >
          <!-- 学科编号 -->
          <el-form-item prop="rid" label="学科编号">
            <el-input
              v-model="editSubjectForm.rid"
              placeholder="请输入学科编号"
            ></el-input>
          </el-form-item>
           <!-- 学科名称 -->
          <el-form-item prop="name" label="学科名称">
            <el-input
              v-model="editSubjectForm.name"
              placeholder="请输入学科名称"
            ></el-input>
          </el-form-item>
           <!-- 学科简称 -->
          <el-form-item prop="short_name" label="学科简称">
            <el-input
              v-model="editSubjectForm.short_name"
              placeholder="请输入学科简称"
            ></el-input>
          </el-form-item>
          <!-- 学科简介 -->
          <el-form-item prop="intro" label="学科简介">
            <el-input
              v-model="editSubjectForm.intro"
              placeholder="请输入学科简介"
            ></el-input>
          </el-form-item>
          <!-- 状态 -->
          <el-form-item label="状态" prop="status">
            <el-select v-model="editSubjectForm.status" placeholder="选择学科状态">
              <el-option label="禁用" :value="0"></el-option>
              <el-option label="启用" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <!-- 学科备注 -->
          <el-form-item prop="remark" label="学科备注">
            <el-input
              v-model="editSubjectForm.remark"
              placeholder="请输入学科备注"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="info" @click="resetEditForm">重 置</el-button>
          <el-button type="primary" @click="editSubject">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  created () {
    this.getSubjectList()
  },
  data () {
    return {
      // 顶部表单绑定数据
      subjectFrom: {
        name: '',
        rid: '',
        username: '',
        status: ''
      },
      // 学科列表
      subjectList: [],
      // 学科列表请求参数
      tableQuery: {
        page: 1,
        limit: 4
      },
      // 学科总数
      total: 0,
      // 对话框显示情况
      dialogVisible: false,
      editDlVisible: false,
      // 添加学科表单绑定值
      addSubjectForm: {
        rid: 'LQ001',
        name: '勾引富婆的N种方法',
        short_name: '再也不快乐',
        intro: '快乐钢丝球，凶猛蜡烛油',
        status: '',
        remark: '赖棋是帅哥'
      },
      editSubjectForm: {},
      // 表单规则
      rules: {
        rid: [
          { required: true, message: '请输入学科编号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入学科名称', trigger: 'blur' }
        ],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      }
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
        return this.$message({
          message: res.message,
          type: 'error'
        })
      }
      this.subjectList = res.data.items
      this.total = res.data.pagination.total
    },
    // 查询符合条件学科
    onSubmit () {
      this.getSubjectList()
    },
    // 重置表单
    onReset () {
      this.$refs.subjectFrom.resetFields()
      // console.log('重置')
      this.getSubjectList()
    },
    // 添加学科
    onAddSubject () {
      this.$refs.addSubjectForm.validate(async valid => {
        if (valid) {
          const res = await this.$axios.post('/subject/add', this.addSubjectForm)
          // console.log(res)
          if (res.code !== 200) {
            return this.$message({
              message: res.message,
              type: 'error'
            })
          }
          this.$message.success('添加学科成功')
          this.dialogVisible = false
          this.getSubjectList()
        } else {
          console.log('请填写正确的提交格式!!')
          return false
        }
      })
    },
    // 重置添加学科form表单
    resetForm () {
      this.$refs.addSubjectForm.resetFields()
    },
    // 重置编辑学科form表单
    resetEditForm () {
      this.$refs.editSubjectForm.resetFields()
    },
    // 关闭对话框的回调函数
    // closeDialog () {
    //   this.resetForm()
    // },
    // 删除用户
    onRemoveSubject (id) {
      this.$confirm('确认要删除该学科', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '放弃'
      })
        .then(async () => {
          const res = await this.$axios.post('/subject/remove', {
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
            message: '删除成功'
          })
          this.getSubjectList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消成功'
          })
        })
    },
    // 修改学科状态
    async setStatus (id) {
      const res = await this.$axios.post('/subject/status', {
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
        message: '修改学科状态成功'
      })
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
    // 获取编辑学科信息
    async getEditSubjectInfo (row) {
      this.editSubjectForm = JSON.parse(JSON.stringify(row))
      this.editDlVisible = true
      // console.log(this.editSubjectForm)
    },
    // 提交编辑的学科
    editSubject () {
      this.$refs.editSubjectForm.validate(async valid => {
        if (valid) {
          const res = await this.$axios.post('/subject/edit', this.editSubjectForm)
          // console.log(res)
          if (res.code !== 200) {
            return this.$message({
              showClose: true,
              message: res.message,
              type: 'error'
            })
          }
          this.$message.success('编辑学科成功')
          this.editDlVisible = false
          this.editSubjectForm = {}
          this.getSubjectList()
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
  width: 150px,
}
</style>
