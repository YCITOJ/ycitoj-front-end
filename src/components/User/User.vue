<template>
  <div class="box">
    <el-card>
    <div>
      <el-descriptions title="用户信息" column="2">
        <template slot="extra">
          <el-button
            type="primary"
            icon="el-icon-close"
            class="word"
            size="small"
            @click="out"
            >退出</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-edit"
            class="word"
            size="small"
            @click="stu_authorize"
            v-if="check_stu"
            >学生认证</el-button
          >
        </template>
        <el-descriptions-item label="用户名">{{form.username}}</el-descriptions-item>
        <el-descriptions-item label="用户ID">{{form.userid}}</el-descriptions-item>
        <el-descriptions-item label="姓名">{{student.real_name}}</el-descriptions-item>
        <el-descriptions-item label="学号">{{student.sid}}</el-descriptions-item>
        <el-descriptions-item label="班级">{{student.class_name}}</el-descriptions-item>
      </el-descriptions>
    </div>
    </el-card>
    <!-- 学生认证 -->
    <el-dialog title="学生认证" :visible.sync="dialogVisible" width="30%">
      <el-form label-width="80px">
        <el-form-item label="学号">
          <el-input v-model="student_form.sid"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="student_form.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="check_stu_authorize">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      student_form: {
        sid: "",
        name: "",
      },
      student: {
        sid: "",
        real_name: "",
        class_name: ""
      },
      form: {
        username: "",
        userid: ""
      },
      // 验证学生认证按钮
      check_stu: "true",
      // 学生认证对话框
      dialogVisible: false,
    };
  },
  created() {
    this.get_stu_authorize();
    this.get_user_form();
  },
  methods: {
    // 获取学生认证信息
    async get_stu_authorize() {
      const { data: res } = await this.$http.get("class/get_stu_authorize");
      console.log(res);
      if (res.meta.status !== 200) {
        return;
      }
      this.check_stu = false;
      this.student.sid = res.sid;
      this.student.real_name = res.real_name;
      this.student.class_name = res.class_name;
    },
    // 获取用具信息
    get_user_form() {
      this.form.username = window.localStorage.getItem("username");
      this.form.userid = window.localStorage.getItem("userid");
    },
    // 验证学生
    stu_authorize() {
      this.dialogVisible = true;
    },
    async check_stu_authorize() {
      const { data: res } = await this.$http.post(
        "class/stu_authorize",
        this.student_form
      );
      //console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success("验证成功！");
      this.dialogVisible = false;
      this.get_stu_authorize();
    },
    out() {
      window.localStorage.setItem("token", "");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.box {
  width: 80%;
  margin-left: 10%;
  margin-top: 40px;
}
.box_container {
  padding-left: 10%;
  width: 80%;
}
.header_card {
  margin-top: 20px;
}
.word {
  float: right;
  margin-right: 20px;
}
</style>
