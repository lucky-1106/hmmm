<template>
  <div class="app">
    <!-- <h2>我是app.vue</h2> -->
    <router-view></router-view>
    <!-- <img src="@/assets/imgs/login_bg.png" alt=""> -->
  </div>
</template>

<script>
export default {
  mounted () {},
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
// 在style中使用@需要在前面添加~
// @import url('~@/assets/css/index.css');
.app {
  width: 100%;
  height: 100%;
}
</style>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body,
html {
  width: 100%;
  height: 100%;
}
li {
  list-style: none;
}
</style>
