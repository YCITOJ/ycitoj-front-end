<template>
  <div class="box">
    <el-card>
      <div>
        <el-descriptions title="用户信息" :column="2">
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
              icon="el-icon-key"
              class="word"
              size="small"
              @click="open_revise_password_dialog = true"
              >修改密码</el-button
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
          <el-descriptions-item label="用户名">{{
            form.username
          }}</el-descriptions-item>
          <el-descriptions-item label="用户ID">{{
            form.userid
          }}</el-descriptions-item>
          <el-descriptions-item label="姓名">{{
            student.real_name
          }}</el-descriptions-item>
          <el-descriptions-item label="学号">{{
            student.sid
          }}</el-descriptions-item>
          <el-descriptions-item label="班级">{{
            student.class_name
          }}</el-descriptions-item>
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

    <el-dialog
      title="修改密码"
      :visible.sync="open_revise_password_dialog"
      width="30%"
    >
      <el-form
        :model="revise_password_form"
        status-icon
        :rules="rules"
        ref="revise_password_form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="password">
          <el-input
            type="password"
            v-model="revise_password_form.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="new_password">
          <el-input
            type="password"
            v-model="revise_password_form.new_password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="check_new_password">
          <el-input
            type="password"
            v-model="revise_password_form.check_new_password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update_pass('revise_password_form')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var check_old_pass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("原密码不能为空"));
      } else {
        var reg = /^[A-Za-z0-9_.]{1,20}$/;
        if (!value.match(reg)) {
          callback(new Error("密码由字母,数字,下划线及（.）组成小于20个字母"));
        } else {
          callback();
        }
      }
    };
    var validate_pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        var reg = /^[A-Za-z0-9_.]{1,20}$/;
        if (!value.match(reg)) {
          callback(new Error("密码由字母,数字,下划线及（.）组成小于20个字母"));
        }
        callback();
      }
    };
    var validate_pass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.revise_password_form.new_password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      student_form: {
        sid: "",
        name: "",
      },
      student: {
        sid: "",
        real_name: "",
        class_name: "",
      },
      form: {
        username: "",
        userid: "",
      },
      // 验证学生认证按钮
      check_stu: "true",
      // 学生认证对话框
      dialogVisible: false,
      // 修改密码对话框
      open_revise_password_dialog: false,
      // 修改密码表单
      revise_password_form: {
        username: "",
        password: "",
        new_password: "",
        check_new_password: "",
      },
      rules: {
        password: [{ validator: check_old_pass, trigger: "blur" }],
        new_password: [{ validator: validate_pass, trigger: "blur" }],
        check_new_password: [{ validator: validate_pass2, trigger: "blur" }],
      },
    };
  },
  created() {
    this.get_stu_authorize();
  },
  methods: {
    // 获取学生认证信息
    async get_stu_authorize() {
      const { data: res } = await this.$http.get("class/get_stu_authorize");
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.check_stu = false;
      this.student.sid = res.sid;
      this.student.real_name = res.real_name;
      this.student.class_name = res.class_name;
      this.get_user_form();
    },
    // 获取用户信息
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
    // 提交修改密
    update_pass(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.revise_password_form.username = window.localStorage.getItem("username");
          const { data: res } = await this.$http.post(
            "/signin/update_pass",
            this.revise_password_form
          );
          if (res.meta.status !== 200) {
            return this.$message.error(res.meta.message);
          }
          this.$message.success(res.meta.message);
          this.open_revise_password_dialog = false;
        } else {
          return false;
        }
      });
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
