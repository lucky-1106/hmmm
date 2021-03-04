<template>
  <div class="uploadimg">
    <!-- 上传图片 -->
    <el-upload
      class="avatar-uploader"
      :action="uploadURL"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      v-if="item"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <!-- 上传视频 -->
    <el-upload
      :action="uploadURL"
      :show-file-list="false"
      class="videoup"
      :on-success="handleAvatarSuccess"
      v-else
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <video controls class="video" v-if="imageUrl" :src="imageUrl"></video>
      <div slot="tip">
        只能上传mp4文件
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  created () {},
  props: ['item'],
  data () {
    return {
      // 图片上传地址
      uploadURL: `${process.env.VUE_APP_BASE_URL}/question/upload`,
      baseURL: process.env.VUE_APP_BASE_URL + '/',
      // 预览图片或者视频地址
      imageUrl: ''
    }
  },
  methods: {
    // 图片或者视频上传前
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 图片或者shi成功上传
    handleAvatarSuccess (res) {
      this.imageUrl = this.baseURL + res.data.url
      if (res.code === 200) {
        if (this.item) {
          this.item.image = res.data.url
        } else {
          this.$emit('video', res.data.url)
        }
      } else {
        this.$message.error('上传失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.uploadimg {
  .avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    margin: 20px 40px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    margin: 20px 40px;
    width: 178px;
    height: 178px;
    display: block;
  }
  .video {
    display: block;
  }
}
.el-upload {
      text-align: left !important;
    }
</style>
