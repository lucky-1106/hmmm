<template>
  <div class="enterprise">
    <el-card>
      <el-form
        :inline="true"
        :model="qtForm"
        ref="qtForm"
        label-width="70px"
        class="demo-form-inline"
      >
        <el-form-item label="学科" prop="subject">
          <el-select
            class="inpwidth"
            v-model="qtForm.subject"
            placeholder="选择学科"
          >
            <el-option
              v-for="item in subject"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select
            class="inpwidth"
            v-model="qtForm.step"
            placeholder="选择阶段"
          >
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <el-select
            class="inpwidth"
            v-model="qtForm.enterprise"
            placeholder="选择企业"
          >
            <el-option
              v-for="item in enterprise"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-select
            class="inpwidth"
            v-model="qtForm.type"
            placeholder="选择题型"
          >
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="简答" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-select
            class="inpwidth"
            v-model="qtForm.difficulty"
            placeholder="选择难度"
          >
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="username">
          <el-input
            class="inpwidth"
            v-model="qtForm.username"
            placeholder="请输入作者"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            class="inpwidth"
            v-model="qtForm.status"
            placeholder="选择状态"
          >
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="create_date">
          <el-date-picker
            class="inpwidth"
            type="date"
            placeholder="选择日期"
            v-model="qtForm.create_date"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input
            class="search"
            v-model="qtForm.title"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getQuestionList">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="$refs.qtForm.resetFields()">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="addQuestion">+添加题目</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <!-- 企业列表 -->
      <el-table :data="qtList" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column prop="title" label="题目" width="350">
        </el-table-column>
        <el-table-column label="学科/阶段" width="120">
          <template v-slot="slot">
            {{ slot.row.subject_name }}/{{
              slot.row.step === 0
                ? '初级'
                : slot.row.step === 1
                ? '中级'
                : '高级'
            }}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="题型" width="80">
          <template v-slot="slot">{{
              slot.row.type === 0
                ? '单选'
                : slot.row.step === 1
                ? '多选'
                : '简答'
            }}
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业" width="120"> </el-table-column>
        <el-table-column prop="username" label="创建者" width="120">
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template v-slot="slotProps">
            <el-tag v-if="slotProps.row.status === 1" type="success"
              >启用</el-tag
            >
            <el-tag v-else type="danger">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量" width="150">
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template v-slot="slotProps">
            <el-button type="warning" v-if="slotProps.row.status === 1" @click="setStatus(slotProps.row.id)"
              >禁用</el-button
            >
            <el-button type="success" v-else @click="setStatus(slotProps.row.id)">启用</el-button>
            <el-button type="primary" @click="editQuestion(slotProps.row)">编辑</el-button>
            <el-button type="danger" @click="onRemoveQuestion(slotProps.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
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
    <ae-question :mode='mode' :subject="subject" :enterprise="enterprise" ref="aeQuestion" @refresh="getQuestionList" :formData="formData"></ae-question>
  </div>
</template>

<script>
import aeQuestion from './aeQuestion'
export default {
  components: {
    aeQuestion
  },
  created () {
    this.getEnterpriseList()
    this.getSubjectList()
    this.getQuestionList()
  },
  data () {
    return {
      qtForm: {
        subject: '',
        step: '',
        enterprise: '',
        type: '',
        difficulty: '',
        username: '',
        status: '',
        create_date: '',
        title: ''
      },
      formData: {},
      tableQuery: {
        page: 1,
        limit: 4
      },
      total: 0,
      subject: [],
      enterprise: [],
      qtList: [],
      mode: 0
    }
  },
  methods: {
    // 获取企业列表
    async getEnterpriseList () {
      const res = await this.$axios.get('/enterprise/list', {
        params: { ...this.enterpriseFrom, ...this.tableQuery }
      })
      console.log(res)
      if (res.code !== 200) {
        return this.$message({
          message: res.message,
          type: 'error'
        })
      }
      this.enterprise = res.data.items
    },
    // 获取学科列表
    async getSubjectList () {
      const res = await this.$axios.get('/subject/list', {
        params: { ...this.subjectFrom, ...this.tableQuery }
      })
      console.log(res)
      if (res.code !== 200) {
        return this.$message.error(res.message)
      }
      this.subject = res.data.items
    },
    // 获取题目列表
    async getQuestionList () {
      const res = await this.$axios.get('/question/list', {
        params: { ...this.qtForm, ...this.tableQuery }
      })
      // console.log(res)
      if (res.code !== 200) {
        return this.$message.error(res.message)
      }
      this.qtList = res.data.items
      this.total = res.data.pagination.total
    },
    // 改变每条显示页数
    handleSizeChange (val) {
      this.tableQuery.limit = val
      this.getQuestionList()
    },
    // 改变当前所在页数
    handleCurrentChange (val) {
      this.tableQuery.page = val
      this.getQuestionList()
    },
    // 修改题目状态
    async setStatus (id) {
      const res = await this.$axios.post('/question/status', {
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
        message: '修改题目状态成功'
      })
      this.getQuestionList()
    },
    // 删除题目
    onRemoveQuestion (id) {
      this.$confirm('确认要删除该题目', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '放弃'
      })
        .then(async () => {
          const res = await this.$axios.post('/question/remove', {
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
          if (this.qtList.length === 1) { this.tableQuery.page-- }
          this.getQuestionList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消成功'
          })
        })
    },
    addQuestion () {
      this.mode = 0
      this.$refs.aeQuestion.dialogVisible = true
    },
    editQuestion (row) {
      this.mode = 1
      this.$refs.aeQuestion.dialogVisible = true
      this.formData = row
    }
  }
}
</script>

<style lang="less" scoped>
.inpwidth {
  width: 250px !important;
}
.search {
  width: 580px;
}
.box-card {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
