<template>
  <div class="box"
  v-loading="loading"
   element-loading-text="拼命加载中"
   element-loading-spinner="el-icon-loading"
   element-loading-background="#ffffff">
    <template>
      <el-table :data="studentlist" style="width: 100%" :default-sort = "{prop: 'sid', order: 'ascending'}">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="class_name" label="班级" width="180">
        </el-table-column>
        <el-table-column prop="real_name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="sid" label="学号"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click.native.stop="del_student(scope.row.user_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      studentlist: [],
      del_student_from: {
          class_id: "",
          usr_id: ""
      },
      // 页面加载
      loading: true,
    };
  },
  created() {
    this.get_Student_List();
  },
  methods: {
    // 获取学生列表
    async get_Student_List() {
      const { data: res } = await this.$http.get(
        `class/myclass/stu_list?class_id=${this.$route.query.id}`
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.studentlist = res.data;
      this.loading = false
    },
    // 根据班级Id和学生ID删除对应的目=学生
    async del_student(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该学生, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      this.del_student_from.class_id = this.$route.query.id;
      this.del_student_from.usr_id = id;
      const { data: res } = await this.$http.post(
        "class/myclass/del_stu",
        this.del_student_from
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success("删除成功！");
      this.get_Student_List();
    },
  },
};
</script>

<style scoped>
.box {
  width: 80%;
  margin: 20px auto;
}
</style>