<template>
  <div>
    <el-card class="box-card">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="题目编号">
        <el-input v-model="form.num"></el-input>
      </el-form-item>
      <el-form-item label="题目名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="上传者">
        <el-input v-model="form.uploader"></el-input>
      </el-form-item>
      <el-form-item label="题目难度">
        <el-input v-model="form.difficulty"></el-input>
      </el-form-item>
      <el-button type="primary" class="button" @click="addpb">提交</el-button>
    </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
              num: '',
              title: '',
              uploader: '',
              difficulty: '' 
            }
        }
    },
    methods: {
     async addpb() {
      const { data: res } = await this.$http.post('problems/create_problem' , this.form)
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('添加失败！')
      }
      this.$message.success("添加成功");
      this.$router.push({path: '/addcontent', query: {id: this.form.num}})
    },
  }
}
</script>
<style scoped>
.box-card {
   margin-left: 35%;
}
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 600px;
  }
  .button {
      width: 100%;
  }
</style>
