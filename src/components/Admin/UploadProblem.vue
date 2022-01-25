<template>
    <div>
        <el-input v-model="uploadnum"></el-input>
        <input type="file" @change="getFile($event)" class="up_things" />
        <el-button @click="uploadsubmit($event)">提交</el-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            uploadnum: '',
            uploadfile: ''
        }
    },
    methods: {
     // 上传文件
    getFile(event) {
      this.uploadfile = event.target.files[0];
    },
    async uploadsubmit(event) {
      event.preventDefault(); //取消默认行为
      //创建 formData 对象
      var formData = new FormData();
      // 向 formData 对象中添加文件
      formData.set("num", this.uploadnum);
      formData.append("file", this.uploadfile);
      const { data: res } = await this.$http.post(
        "backup/upload_problem",
        formData
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success(res.meta.message);
    },
    }
}
</script>