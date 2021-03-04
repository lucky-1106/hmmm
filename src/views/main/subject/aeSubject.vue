<template>
  <el-dialog :visible.sync="dialogVisible" close-on-press-escape width="30%" @closed="$refs.aeForm.resetFields()">
    <span slot="title" class="dialog-title">{{
      mode === 0 ? '新增学科' : '编辑学科'
    }}</span>
    <!-- 添加学科表单 -->
    <el-form
      :model="aeForm"
      :rules="rules"
      ref="aeForm"
      class="demo-ruleForm"
      label-width="80px"
    >
      <!-- 学科编号 -->
      <el-form-item prop="rid" label="学科编号">
        <el-input v-model="aeForm.rid" placeholder="请输入学科编号"></el-input>
      </el-form-item>
      <!-- 学科名称 -->
      <el-form-item prop="name" label="学科名称">
        <el-input v-model="aeForm.name" placeholder="请输入学科名称"></el-input>
      </el-form-item>
      <!-- 学科简称 -->
      <el-form-item prop="short_name" label="学科简称">
        <el-input
          v-model="aeForm.short_name"
          placeholder="请输入学科简称"
        ></el-input>
      </el-form-item>
      <!-- 学科简介 -->
      <el-form-item prop="intro" label="学科简介">
        <el-input
          v-model="aeForm.intro"
          placeholder="请输入学科简介"
        ></el-input>
      </el-form-item>
      <!-- 学科备注 -->
      <el-form-item prop="remark" label="学科备注">
        <el-input
          v-model="aeForm.remark"
          placeholder="请输入学科备注"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="info" @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  created () {},
  props: ['mode', 'formData'],
  data () {
    return {
      // 对话框的显示状态
      dialogVisible: false,
      // 判断新增还是编辑
      // mode: 0,
      // 表单
      aeForm: {
        rid: '',
        name: '',
        short_name: '',
        intro: '',
        remark: ''
      },
      // 表单规则
      rules: {
        rid: [{ required: true, message: '请输入学科编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入学科名称', trigger: 'blur' }]
      }
    }
  },
  // 监听对话框关闭重置表单
  watch: {
    dialogVisible (newValue) {
      if (newValue) {
        if (this.mode === 0) {
          this.aeForm = {
            rid: '',
            name: '',
            short_name: '',
            intro: '',
            remark: ''
          }
        } else {
          this.aeForm = JSON.parse(JSON.stringify(this.formData))
        }
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.aeForm.validate(async valid => {
        if (valid) {
          const url = this.mode === 0 ? '/subject/add' : '/subject/edit'
          const res = await this.$axios.post(url, this.aeForm)
          // console.log(res)
          if (res.code !== 200) {
            return this.$message.error(res.message)
          }
          this.$message.success(
            this.mode === 0 ? '新增学科成功' : '编辑学科成功'
          )
          this.dialogVisible = false
          this.$emit('refresh')
        } else {
          this.$message.waring('请填写正确的提交格式!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
