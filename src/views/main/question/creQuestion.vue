<template>
  <div class="creQuestion">
    <el-radio-group v-model="form.single_select_answer" v-if="form.type === '1'" @change="checkData">
      <el-row v-for="item in form.select_options" :key="item.label" class="uprow">
        <el-col :span="2">
          <el-radio :label="item.label">{{ item.label }}</el-radio>
        </el-col>
        <el-col :span="14">
          <el-input v-model="item.text" placeholder="请输入选项内容"></el-input>
        </el-col>
        <el-col :span="8">
          <upload-img :item="item"></upload-img>
        </el-col>
      </el-row>
    </el-radio-group>
    <el-checkbox-group v-model="form.multiple_select_answer" v-else-if="form.type === '2'" @change="checkData">
      <el-row v-for="item in form.select_options" :key="item.label" class="uprow">
        <el-col :span="2">
          <el-checkbox :label="item.label">{{ item.label }}</el-checkbox>
        </el-col>
        <el-col :span="14">
          <el-input v-model="item.text" placeholder="请输入选项内容"></el-input>
        </el-col>
        <el-col :span="8">
          <upload-img :item="item"></upload-img>
        </el-col>
      </el-row>
    </el-checkbox-group>
    <div v-else>
      <el-input
        v-model="form.short_answer"
        type="textarea"
        @change="checkData"
        :rows="6"
      ></el-input>
    </div>
  </div>
</template>

<script>
import uploadImg from './uploadImg'
export default {
  components: {
    uploadImg
  },
  props: ['form'],
  created () {},
  data () {
    return {
    }
  },
  methods: {
    checkData () {
      // 调用父组件中的校验方法
      this.$emit('data')
    }
  }
}
</script>

<style lang="less" scoped>
.creQuestion {
  .uprow {
    display: flex;
    align-items: center;
  }
}
</style>
