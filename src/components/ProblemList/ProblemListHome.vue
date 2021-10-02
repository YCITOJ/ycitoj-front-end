<template>
  <div class="box1">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="problemlisthomeinfo">题单简介</el-menu-item>
      <el-menu-item index="problemlisthomelist">题目列表</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: 'problemlisthomeinfo',
      };
    },
    created() {
      this.activeIndex = window.sessionStorage.getItem("proList_activeIndex");
    },
    methods: {
      handleSelect(key, keyPath) {
        window.sessionStorage.setItem("proList_activeIndex", key);
        this.activeIndex = key
        this.$router.push({path: '/'+ key, query: {id: this.$route.query.id}});
        //console.log(key)
      }
    }
  }
</script>
<style scoped>
.box1 {
  position: absolute;
  width: 80%;
  top: 80px;
  bottom: 0;
  left: 10%;
  right: 0;
  margin: auto;
}
</style>