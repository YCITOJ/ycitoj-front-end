<template>
  <div class="box">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="公告名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <mavon-editor v-model="form.info" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="put_announcement">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        info: "",
      },
      // 页面加载
      loading: true,
    };
  },
  methods: {
    // 提交公告
    async put_announcement() {
      const { data: res } = await this.$http.post(
        "announcement/create",
        this.form
      );
      if (res.meta.status === 400) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success(res.meta.message);
      this.$router.go(-1);  
    },
  },
};
</script>

<style scoped>
.box {
  position: absolute;
  width: 80%;
  top: 80px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
