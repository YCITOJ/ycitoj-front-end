<template>
  <div class="login_container">
    <div v-bind:class="model == 'login'?'login_box1':'login_box2'">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{ current: item.current }"
          @click="toggleMneu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!-- 表单区域 -->
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="password"
          ></el-input>
        </el-form-item>
        <!--  <el-form-item prop="email" v-show="model === 'register'">
          <el-input v-model="loginForm.email" type="email" placeholder="email" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="mobil" v-show="model === 'register'">
          <el-input v-model="loginForm.mobile" type="mobile" placeholder="mobile" :disabled="true"></el-input>
        </el-form-item> -->

        <el-checkbox v-model="checked" v-show="model === 'login'"
          >记住密码</el-checkbox
        >
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button @click="login" @keyup.enter="login" class="block"
            >提交</el-button
          >
        </el-form-item>
        <hr />
        <el-link
          type="success"
          @click="toggleMneu(menuTab[1])"
          class="bottom_register"
          >立即注册</el-link
        >
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      // 记住密码
      checked: false,
      menuTab: [
        { txt: "登录", current: true, type: "login" },
        { txt: "注册", current: false, type: "register" },
      ],
      model: "login",
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        email: [{ message: "请输入登录密码", trigger: "blur" }],
        mobile: [{ message: "请输入登录密码", trigger: "blur" }],
      },
    };
  },
  created() {
    var lett = this;
    document.onkeydown = function (e) {
      var key = window.event.keyCode;
      if (key == 13) {
        lett.login();
      }
    };
  },
  methods: {
    toggleMneu(data) {
      this.menuTab.forEach((elem) => {
        elem.current = false;
      });
      data.current = true;
      this.model = data.type;
    },
    login() {
      if (this.model === "login") {
        this.$refs.loginFormRef.validate(async (valid) => {
          if (!valid) return;
          const { data: res } = await this.$http.post(
            "signin/login",
            this.loginForm
          );
          if (res.meta.status !== 200) return this.$message.error("登录失败！");
          //this.$message.success("登录成功");
          this.userid = res.data.id;
          // 保存token 和 id
          /* window.sessionStorage.setItem("token", res.data.token); */
          window.localStorage.setItem("token", res.data.token);
          window.localStorage.setItem("userid", res.data.id);
          window.localStorage.setItem("username", res.data.username);
          window.localStorage.setItem("access", res.data.access);
          //路由地址是 /home
          this.$router.push("/topic");
        });
      } else if (this.model === "register") {
        this.$refs.loginFormRef.validate(async (valid) => {
          if (!valid) return;
          // 可以发起添加用户的网络请求
          const { data: res } = await this.$http.post(
            "signup/register",
            this.loginForm
          );
          if (res.meta.status !== 200) {
            this.$message.error("注册失败！");
            return;
          }
          this.$message.success("注册成功,请登录！");
        });
      }
    },
  },
};
</script>
<style scoped>
.login_container {
  background: linear-gradient(to right, #7bb7b7 50%, #e5cfaa 50%);
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}

.login_box1 {
  width: 400px;
  height: 400px;
  background:#e5cfaa;
  border-radius: 10%;
  position: absolute;
  left: 48.8%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login_box2 {
  width: 400px;
  height: 400px;
  background:#7bb7b7;
  border-radius: 10%;
  position: absolute;
  left: 48.8%;
  top: 50%;
  transform: translate(-50%, -50%);
}
/* 选择登录注册样式 */
.menu-tab {
  text-align: center; 
}
li {
  display: inline-block;
  width: 88px;
  line-height: 36px;
  font-size: 14px;
  border-radius: 2px;
  cursor: pointer;
}
.current {
  background-color: rgba(0, 0, 0, 0.1);
  color: #fff;
}

.login_form {
  position: absolute;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.login_form .el-checkbox {
  margin-bottom: 5px;
}
.btns .el-button {
  width: 100%;
}
.bottom_register {
  float: right;
}
</style>
