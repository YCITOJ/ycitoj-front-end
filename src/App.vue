<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view v-if="$route.meta.keepAlive"></router-view>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
</style>
