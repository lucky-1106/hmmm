<template>
  <el-dialog
    class="aequestion"
    :visible.sync="dialogVisible"
    close-on-press-escape
    fullscreen
    center
  >
    <span slot="title" class="dialog-title">{{
      mode === 0 ? '新增题目' : '编辑题目'
    }}</span>
    <el-form :model="aeForm" ref="aeForm" :rules="rules">
      <el-form-item label="学科" label-width="80px" prop="subject">
        <el-select
          class="inpwidth"
          v-model="aeForm.subject"
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
      <el-form-item label="阶段" prop="step" label-width="80px">
        <el-select
          class="inpwidth"
          v-model="aeForm.step"
          placeholder="选择阶段"
        >
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" prop="enterprise" label-width="80px">
        <el-select
          class="inpwidth"
          v-model="aeForm.enterprise"
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
      <el-form-item label="城市" prop="city" label-width="80px">
        <el-cascader
          class="inpwidth"
          v-model="aeForm.city"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="题型" prop="type" label-width="80px">
        <el-radio-group v-model="aeForm.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" prop="difficulty" label-width="80px">
        <el-radio-group v-model="aeForm.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="题目标题" prop="title" label-width="80px">
        <quill-editor
          class="quill_editor"
          v-model="aeForm.title"
        ></quill-editor>
      </el-form-item>
      <el-form-item
        :label="
          aeForm.type === 1 ? '单选' : aeForm.type === 2 ? '多选' : '简答'
        "
        label-width="80px"
      >
        <cre-question :form="aeForm" @data="getAnswer"></cre-question>
      </el-form-item>
      <el-form-item label="解析视频" label-width="80px">
        <upload-img :item="false" @video="getVideoUrl"></upload-img>
      </el-form-item>
      <el-form-item label="答案解析" prop="answer_analyze" label-width="80px">
        <quill-editor
          class="quill_editor"
          v-model="aeForm.answer_analyze"
        ></quill-editor>
      </el-form-item>
      <el-form-item label="备注" prop="remark" label-width="80px">
        <el-input v-model="aeForm.remark"></el-input>
      </el-form-item>
    </el-form>
    <p>{{ aeForm }}</p>
    <span slot="footer" class="dialog-footer">
      <el-button type="info" @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addQuestion">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { regionData } from 'element-china-area-data'
import { quillEditor } from 'vue-quill-editor'
import creQuestion from './creQuestion'
import uploadImg from './uploadImg'
export default {
  components: {
    quillEditor,
    creQuestion,
    uploadImg
  },
  props: {
    mode: {
      type: Number,
      default: 0
    },
    subject: {
      type: Array
    },
    enterprise: {
      type: Array
    },
    formData: {
      type: Object
    }
  },
  created () {},
  data () {
    return {
      dialogVisible: false,
      options: regionData,
      aeForm: {
        subject: '',
        step: '',
        enterprise: '',
        city: [],
        type: 1,
        difficulty: 1,
        title: '',
        single_select_answer: '',
        multiple_select_answer: [],
        short_answer: '',
        video: '',
        answer_analyze: '',
        remark: '',
        select_options: [
          {
            label: 'A',
            text: '',
            image: ''
          },
          {
            label: 'B',
            text: '',
            image: ''
          },
          {
            label: 'C',
            text: '',
            image: ''
          },
          {
            label: 'D',
            text: '',
            image: ''
          }
        ]
      },
      // 设置校验规则
      rules: {
        subject: [
          { required: true, message: '请选择学科名', trigger: 'change' }
        ],
        step: [{ required: true, message: '请选择阶段', trigger: 'change' }],
        enterprise: [
          { required: true, message: '请选择企业', trigger: 'change' }
        ],
        city: [{ required: true, message: '请选择城市', trigger: 'change' }],
        type: [{ required: true, message: '请选择题型', trigger: 'change' }],
        difficulty: [
          { required: true, message: '请选择难度', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请输入试题标题', trigger: 'change' }
        ],
        single_select_answer: [
          { required: true, message: '请设置单选答案', trigger: 'change' }
        ],
        multiple_select_answer: [
          { required: true, message: '请设置多选答案', trigger: 'change' }
        ],
        short_answer: [
          { required: true, message: '请输入简答内容', trigger: 'change' }
        ],
        answer_analyze: [
          { required: true, message: '请输入试题解析', trigger: 'change' }
        ],
        remark: [
          { required: true, message: '请输入试题备注', trigger: 'change' }
        ]
      }
    }
  },
  // 监听对话框关闭重置表单
  watch: {
    dialogVisible (newValue) {
      if (newValue) {
        if (this.mode === 0) {
          this.aeForm = {
            subject: '',
            step: '',
            enterprise: '',
            city: [],
            type: 1,
            difficulty: 1,
            title: '',
            single_select_answer: '',
            multiple_select_answer: [],
            short_answer: '',
            video: '',
            answer_analyze: '',
            remark: '',
            select_options: [
              {
                label: 'A',
                text: '',
                image: ''
              },
              {
                label: 'B',
                text: '',
                image: ''
              },
              {
                label: 'C',
                text: '',
                image: ''
              },
              {
                label: 'D',
                text: '',
                image: ''
              }
            ]
          }
        } else {
          this.aeForm = JSON.parse(JSON.stringify(this.formData))
        }
      } else {
        this.$refs.aeForm.resetFields()
      }
    }
  },
  methods: {
    getVideoUrl (value) {
      this.aeForm.video = value
    },
    // 对试题的答案进行验证
    getAnswer () {
      // 判断题目的类型
      if (this.aeForm.type === 1) {
        // 单选：验证 single_select_answer
        this.$refs.aeForm.validateField(['single_select_answer'])
      } else if (this.aeForm.type === 2) {
        // 多选：验证 multiple_select_answer
        this.$refs.aeForm.validateField(['multiple_select_answer'])
      } else {
        // 简答：验证 short_answer
        this.$refs.aeForm.validateField(['short_answer'])
      }
    },
    addQuestion () {
      this.$refs.aeForm.validate(async valid => {
        if (valid) {
          const url = this.mode === 0 ? '/question/add' : '/question/edit'
          const res = await this.$axios.post(url, this.aeForm)
          // console.log(res)
          if (res.code !== 200) {
            return this.$message.error(res.message)
          }
          this.$message.success(
            this.mode === 0 ? '新增题目成功' : '编辑题目成功'
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

<style lang="less" scoped>
.inpwidth {
  width: 400px !important;
}
</style>
<style lang="less">
.aequestion {
  .el-dialog--center {
    .el-dialog__body {
      padding: 20px 400px;
    }
  }
}
.el-cascader-panel {
  height: 210px;
}
.quill_editor {
  width: 600px;
}
</style>
