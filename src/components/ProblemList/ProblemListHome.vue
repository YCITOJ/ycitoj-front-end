<template>
  <div class="box1">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
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
    methods: {
      handleSelect(key, keyPath) {
        this.$router.push({path: '/'+ key, query: {id: this.$route.query.id}});
      }
    }
  }
</script>
<style scoped>
.box1 {
  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
}
</style>