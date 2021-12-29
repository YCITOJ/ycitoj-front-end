<template>
  <el-card>
    <el-container>
      <el-aside width="50%">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="textarea"
          :rows="30"
          maxlength="200"
          show-word-limit
        >
        </el-input>
        <el-button type="primary" @click="gen_table()">预览</el-button>
        <el-button type="success" @click="insert_auth_table()">提交</el-button>
      </el-aside>
      <el-main>
        <el-table :data="table" style="width: 80%">
          <el-table-column prop="sid" label="学号" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="class_name" label="班级"> </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      textarea: "",
      table: [],
    };
  },
  methods: {
    gen_table() {
      this.table = this.convert_to_tab(this.textarea);
    },
    convert_to_tab(text) {
      let lines = text.split("\n");
      lines=lines.filter((line)=>{
          return line!="";
      })
      let res = [];
      for (let line of lines) {
        let cur_row = line.split(",");
        if (cur_row.length != 3) return null;
        res.push({ sid: cur_row[0], name: cur_row[1], class_name: cur_row[2] });
      }
      return res;
    },
    async insert_auth_table() {
      this.gen_table();
      console.log(this.table);
      const { data: res } = await this.$http.post(
        "admin/insert_auth_table",
        {data:this.table}
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      return this.$message.success(res.meta.message);
    },
  },
};
</script>
<style scoped>
.el-card {
  margin: 10px 10px;
}
.el-input {
  height: 300px;
}
.el-main {
  padding-left: 10%;
}
</style>