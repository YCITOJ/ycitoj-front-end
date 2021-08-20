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
        <el-menu-item index="3">讨论</el-menu-item>
      </el-menu>
    </el-header>
    <div class="heng"></div>
    <el-container>
      <el-aside width="800px" class="el-aside1">
        <h3>{{info.num}} {{info.title}}</h3>
        <div class="submitjshao">
          <div class="submitjshao_time_limit">时间限制： {{info.time_limit}}ms </div>
          <div class="submitjshao_memory_limit">空间限制： {{info.memory_limit}}MB </div>
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
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
              >
                <el-submenu index="1">
                  <template slot="title">{{ displaylanguage }}</template>
                  <el-menu-item index="cpp">cpp</el-menu-item>
                  <el-menu-item index="rust">rust</el-menu-item>
                  <el-menu-item index="python">python</el-menu-item>
                  <el-menu-item index="merdog">merdog</el-menu-item>
                  <el-menu-item index="node">node</el-menu-item>
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
              <el-button type="primary" @click="submitcode()" v-if="submittijiaoflag=='true'" class="submittijiao_button">提交代码</el-button>
              <el-card class="sumitcard">
                <div>{{ ans }}</div>
              </el-card>
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
import "codemirror/mode/go/go";
import "codemirror/lib/codemirror.css";
// require active-line.js
import "codemirror/addon/selection/active-line.js";
// styleSelectedText
import "codemirror/addon/selection/mark-selection.js";
// hint
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/sql-hint.js";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint.js";
// highlightSelectionMatches
import "codemirror/addon/scroll/annotatescrollbar.js";
import "codemirror/addon/search/matchesonscrollbar.js";
import "codemirror/addon/search/match-highlighter.js";
// keyMap
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/sql/sql.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/comment/comment.js";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";
import "codemirror/keymap/sublime.js";
// foldGutter
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/xml-fold.js";
// 编辑的主题文件
import "codemirror/theme/monokai.css";
import "codemirror/theme/base16-light.css";
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
      // 题目名称
      title: "",
      ans: "保存提交后，这里会显示代码提交结果",
      item: {
        content: "",
      },
      submitstring: {
        num: "",
        lang: "",
        data: "",
      },
      // 编辑器的设置
      cmOption: {
        tabSize: 2, // tab
        styleActiveLine: true, // 高亮选中行
        lineNumbers: true, // 显示行号
        styleSelectedText: true,
        line: true,
        foldGutter: true, // 块槽
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true }, // 可以启用该选项来突出显示当前选中的内容的所有实例
        mode: {
          // 模式, 可查看 codemirror/mode 中的所有模式
          name: "go",
          json: true,
        },
        // hint.js options
        hintOptions: {
          // 当匹配只有一项的时候是否自动补全
          completeSingle: false,
        },
        // 快捷键 可提供三种模式 sublime、emacs、vim
        keyMap: "sublime",
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: "monokai", // 主题
        extraKeys: { Ctrl: "autocomplete" }, // 可以用于为编辑器指定额外的键绑定，以及keyMap定义的键绑定
      },
      // 显示选择了什么语言
      displaylanguage: "cpp",
      // 查询提交结果
      submission_id: "",
      // 提交按钮是否可以点击
      submittijiaoflag: "true",
    };
  },
  created() {
    this.readproblem();
  },
  methods: {
    // 获取题目
    async readproblem() {
      this.num = this.$route.query.id;
      this.title = this.$route.query.title;
      const { data: res } = await this.$http.get(
        "problems/read_problem?num=" + this.num
      );
      //console.log(res);
      this.value = res.data;
      this.info = res.info;
    },
    // 返回主页
    gotohome() {
      this.$router.push("/topic");
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
      if (key === "rust") {
        this.displaylanguage = "rust";
        return;
      }
      if(key === "python") {
        this.displaylanguage = "python";
        return;
      }
      if(key === "node") {
        this.displaylanguage = "node";
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
      this.submitstring.num = this.num;
      this.submitstring.lang = this.displaylanguage;
      this.submitstring.data = this.item.content;
      const { data: res } = await this.$http.post(
        "submit/submit_code/",
        this.submitstring
      );
      //console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error("提交题目失败,请登录！");
      }
      this.submission_id = res.data;
      this.submittijiaoflag='false';
      this.ans = "评测中..."
      for(var i=0;i<=30;i++)
      {
        await this.sleep(1000);
        await this.outcome();
        if(this.ans !== "评测中...")
        {
          this.submittijiaoflag='true';
          break;
        }  
      }
    },
    async outcome() {
      //console.log(this.submission_id);
      const { data: res } = await this.$http.get("submit/submission_result?submission_id=" + this.submission_id);
      //console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error("提交反馈失败");
      }
      if (res.verdict === 0) {
        return (this.ans = "评测中...");
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
  },
};
</script>
<style scoped>
.box {
  margin-left: 40px;
  margin-right: 40px;
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
</style>
