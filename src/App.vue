<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  /* mounted() {
    if (this._isMobile()) {
      alert("手机端");
      this.$router.replace('/MoblieHome');
    } else {
      alert("pc端");
      this.$router.replace('/home');
    }
  },
  methods: {
    _isMobile() {
	 let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
	 return flag;
  }
  } */
}
</script>

<style>
</style>
