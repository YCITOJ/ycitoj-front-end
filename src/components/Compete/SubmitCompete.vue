<template>
  <el-container>
    <el-header>
      <el-menu
        class="el-menu-demo1"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item
          index="1"
          class="el-icon-house"
          @click="gotohome"
        ></el-menu-item>
        <el-menu-item index="2" @click="gotoproblemSubmit">提交记录</el-menu-item>
      </el-menu>
    </el-header>
    <div class="heng"></div>
    <el-container>
      <el-aside width="800px" class="el-aside1">
        <div id="submit_problem_header">
          <div class="top_header">
            <h2>{{ num_A }}. {{ info.title }}</h2>
          </div>
          <div class="left_header">
            <div class="button_div">
              <el-button type="danger" icon="el-icon-timer" size="mini"
                >{{ info.time_limit }}ms</el-button
              >
              <el-button type="primary" icon="el-icon-cpu" size="mini"
                >{{ info.memory_limit }}MB</el-button
              >
            </div>
          </div>
          <div class="right_header">
            <!-- 通过区域 -->
            <div class="first">
              <!-- 通过区域数量 -->
              <div>
                <p class="count">{{ info.ac_cnt }}</p>
                <p class="name">通过</p>
              </div>
            </div>
            <!-- 提交区域 -->
            <div class="secend">
              <!-- 提交区域数量 -->
              <div>
                <p class="count">{{ info.subm_cnt }}</p>
                <p class="name">提交</p>
              </div>
            </div>
          </div>
        </div>
        <mavon-editor
          class="md"
          v-model="value"
          :subfield="false"
          :defaultOpen="'preview'"
          :toolbarsFlag="false"
          :editable="false"
          :scrollStyle="true"
          :ishljs="true"
        />
      </el-aside>
      <div class="line"></div>
      <el-main class="el-main1">
        <div class="box3box">
          <el-container>
            <el-header height="60px">
              <el-menu
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#e9e9e9"
                text-color="#000"
                active-text-color="#ffd04b"
              >
                <el-submenu index="1">
                  <template slot="title">{{ displaylanguage }}</template>
                  <el-menu-item index="cpp">cpp</el-menu-item>
                  <el-menu-item index="python">python</el-menu-item>
                  <el-menu-item index="merdog">merodg</el-menu-item>
                </el-submenu>
              </el-menu>
            </el-header>
            <el-main class="edit">
              <codemirror
                v-model="item.content"
                :options="cmOption"
                class="code-mirror"
                @ready="onCmReady3"
                ref="myCmGenerate"
              ></codemirror>
            </el-main>
            <el-footer class="submittijiao">
              <!-- <div class="submittijiao_ans">{{ ans }}</div> -->
              <el-button
                type="primary"
                @click="submitcode()"
                v-if="submittijiaoflag == 'true'"
                class="submittijiao_button"
                >提交代码</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-loading"
                v-if="submittijiaoflag == 'false'"
                class="submittijiao_button"
              ></el-button>
            </el-footer>
          </el-container>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// 引入codemirror
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/clike/clike.js";
// theme css
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/eclipse.css";
export default {
  components: {
    codemirror,
  },
  data() {
    return {
      // 题目信息
      info: [],
      // 题目内容
      value: "",
      // 题目编号
      num: "",
      // 题目编号转字母
      num_A: "",
      // 题目名称
      title: "",
      ans: "保存提交后，这里会显示代码提交结果",
      item: {
        content: "",
      },
      submitstring: {
        contest_id: "",
        whoe: "",
        lang: "",
        code: "",
        num: ""
      },
      // 编辑器的设置
     cmOption: {
        // codemirror options
        tabSize: 4,
        styleActiveLine: true, // 高亮选中行
        foldGutter: true, // 块槽
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        matchBrackets: true,
        mode: "text/x-c++src",
        theme: "eclipse",
        lineNumbers: true,
        line: true,
      },
      // 显示选择了什么语言
      displaylanguage: "cpp",
      // 查询提交结果
      submission_id: "",
      // 提交按钮是否可以点击
      submittijiaoflag: "true",

      is_admin:false,
    };
  },
  created() {
    this.readproblem();
    this.check_access();
  },
  methods: {
    // 检查编辑权限
    check_access(){
      if (window.localStorage.getItem("access") <= 1) 
        this.is_admin = true;
      else 
        this.is_admin = false;
    },
    // 获取题目
    async readproblem() {
      this.num = this.$route.query.id;
      this.num_A = String.fromCharCode(65+Number(this.$route.query.index));
      this.title = this.$route.query.title;
      const { data: res } = await this.$http.get(
        "problems/read_problem?num=" + this.num
      );
      this.value = res.data;
      this.info = res.info;
    },
    // 返回主页
    gotohome() {
      this.$router.push({path: '/competehome', query: {id: this.$route.query.competeid}});
    },
    // 进去提交页面
    gotoproblemSubmit() {
        this.$router.push({path: '/problemSubmit', query: {id: this.num}});
    },
    onCmReady3() {
      this.$refs.myCmGenerate.codemirror.setSize("100%", "500px");
    },
    // 选择菜单的复制
    handleSelect(key, keyPath) {
      if (key === "cpp") {
        this.displaylanguage = "cpp";
        return;
      }
      if(key === "python") {
        this.displaylanguage = "python";
        return;
      }
      if(key === "merdog") {
        this.displaylanguage = "merdog";7455
        return;
      }
    },
    // 提交代码
    async sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async submitcode() {
      this.submitstring.contest_id = this.$route.query.competeid;
      this.submitstring.who = window.localStorage.getItem("userid");
      this.submitstring.lang = this.displaylanguage;
      this.submitstring.code = this.item.content;
      this.submitstring.num = this.$route.query.id;
      const { data: res } = await this.$http.post(
        "contest/submit_code",
        this.submitstring
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.submission_id = res.data;
      this.submittijiaoflag='false';
      this.ans = "评测中..."
      for(var i=0;i<=20;i++)
      {
        await this.sleep(1000);
        await this.outcome();
        if(this.ans !== "Judging")
        {
          this.submittijiaoflag='true';
          break;
        }  
      }
    },
    async outcome() {
      const { data: res } = await this.$http.get("submit/submission_result?submission_id=" + this.submission_id);
      if (res.meta.status !== 200) {
        return this.$message.error("提交反馈失败");
      }
      if (res.verdict === 0) {
        return (this.ans = "Judging");
      }
      if (res.verdict === 1) {
        return (this.ans = "Time Limit Exceeded.");
      }
      if (res.verdict === 2) {
        return (this.ans = "Memory Limit Exceeded.");
      }
      if (res.verdict === 3) {
        return (this.ans = "RunTime Error.");
      }
      if (res.verdict === 4) {
        return (this.ans = "UKE");
      }
      if (res.verdict === 5) {
        return (this.ans = "Compile Error.");
      }
      if (res.verdict === 6) {
        this.$message.success("恭喜你，通过了！");
        return (this.ans = "Accepted.");
      }
      if (res.verdict === 7) {
        return (this.ans = "Wrong Answer.");
      }
    },
    editProblem(){
      this.$router.push({ path: "/revise", query: { id: this.num } });
    }
  },
};
</script>
<style scoped>
.box {
  position: absolute;
  width: 80%;
  top: 80px;
  bottom: 0;
  left: 10%;
  right: 0;
  margin: auto;
}
.el-menu-demo1 {
  position: relative;
  width: 100%;
  height: 60px;
}
.el-aside1 {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
}
.el-aside1 h3 {
  padding-left: 4%;
}
.el-main1 {
  position: absolute;
  left: 820px;
  right: 0;
  top: 80px;
  bottom: 0;
  overflow-y: scroll;
}
.container_title {
  padding-left: 20px;
}

.submitjshao {
  background-color: #ebebeb;
  height: 60px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  padding-left: 20px;
  line-height: 60px;
}
.submitjshao_time_limit {
  float: left;
  padding-left: 5%;
}
.submitjshao_memory_limit{
  float: right;
  padding-right: 20%;
}
#submit_problem_header {
  width: 100%;
}
#submit_problem_header .left_header {
  float: left;
  width: 40%;
  height: 90px;
}
#submit_problem_header .top_header {
  margin-left: 20px;
}
#submit_problem_header .left_header .button_div {
  margin-left: 20px;
}
#submit_problem_header .left_header .button_div button {
  padding: 6px 8px;
}
#submit_problem_header .right_header {
  float: right;
  width: 60%;
  height: 90px;
}
#submit_problem_header .right_header p {
  line-height: 0;
  text-align: center;
  margin-top: 5px;
}
#submit_problem_header .right_header .count {
  font-size: 40px;
}
#submit_problem_header .right_header .first {
  float: left;
  width: 50%;
}
#submit_problem_header .right_header .secend {
  float: right;
  width: 50%;
}
.md {
  margin-top: 20px;
}
.heng {
  width: 100%;
  height: 10px;
  background-color: #f4f5f6;
}
.line {
  width: 4px;
  height: 100%;
}
.box3box {
  padding-top: 0;
}
.result_area {
  width: 100%;
  height: 100%;
  background-color: #000;
}

/* codemirror */
.CodeMirror-scroll {
  overflow: scroll !important;
  margin-bottom: 0;
  margin-right: 0;
  padding-bottom: 0;
  height: 100%;
  outline: none;
  position: relative;
  border: 1px solid #dddddd;
}
.code-mirror {            
  font-size: 20px;
  line-height: 150%;
  text-align: left;
  width: 100%;
  height: 100%5;
}

.submittijiao_button {
  float: right;
}

.submittijiao_button {
  float: left;
  width: 20%;
}
</style>
