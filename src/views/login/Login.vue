<template>
  <div class="login">
    <div class="loginbox"></div>
    <div class="loginimg">
      <a href="javascript:;"><img src="@/assets/imgs/login_bg.png" alt=""/></a>
    </div>
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
.login {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  min-width: 1400px;
  background: linear-gradient(225deg, #01c6fa, #1493fa);
  .loginbox {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
  }
  .loginimg {
    width: 633px;
    height: 435px;
    animation: myfirst 1s;
    -webkit-animation: myfirst 1s; /* Safari and Chrome */
  }
  @keyframes myfirst {
    from {
      transform: translateY(-50px);
    }
    to {
      transform: translateY(0px);
    }
  }

  @-webkit-keyframes myfirst /* Safari and Chrome */ {
    from {
      transform: translateY(-50px);
    }
    to {
      transform: translateY(0px);
    }
  }
}
</style>
