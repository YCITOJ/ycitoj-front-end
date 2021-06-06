<template>
  <div>
    <el-container>
      <el-header>
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="2" class="el-icon-house" @click="gotohome"></el-menu-item>
          <el-menu-item index="1">{{ num }}</el-menu-item>
        </el-menu>
      </el-header>
      <div class="heng"></div>
      <el-container>
        <el-aside width="50%">
          <div class="submitjshao">
            时间限制： C/C++1秒,其他语言2秒 空间限制： C/C++ 64M,其他语言128M
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
        /></el-aside>
        <div class="line"></div>
        <el-main>
          <div class="box3box">
            <el-container>
              <el-header height="60px">
                <el-menu
                  class="el-menu-demo"
                  mode="horizontal"
                  @select="handleSelect"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b">
                  <el-submenu index="1">
                    <template slot="title">{{displaylanguage}}</template>
                    <el-menu-item index="CPP">CPP</el-menu-item>
                    <el-menu-item index="C">C</el-menu-item>
                    <el-menu-item index="JAVA">JAVA</el-menu-item>
                    <el-menu-item index="PHP">PHP</el-menu-item>
                  </el-submenu>
                </el-menu>
              </el-header>
              <el-main>
                <codemirror
                  v-model="item.content"
                  :options="cmOption"
                  class="code-mirror"
                  @ready="onCmReady3"
                  ref="myCmGenerate"
                ></codemirror>
              </el-main>
              <el-footer class="submittijiao">
                <el-button type="primary">提交代码</el-button>
                <p>运行结果：</p>
                <div class="result_area"></div>
              </el-footer>
            </el-container>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
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
      value: "根据输入的正整数$n$<br>米字形由一个$(2n-1)*(2n-1)$的矩阵组成，矩阵包含从大写$A$开始的$n$个字母例如:$n$=3时，包含$A,B,C；n=4$时，包含$A,B,C,D$。矩阵的正中间为$n$个字母中字典序最大的那个，从这个字母开始，沿着西北、正北、东北、正西、正东、西南、正南、东南八个方向各有一条由大写字母组成的直线。并且直线上的字母按字典序依次减小，直到大写字母$A$。矩阵的其它位置用英文句号．填充。<br>```样例输入一3样例输出<br>Ａ．Ａ．Ａ．ＢＢＢ．ＡＢＣＢＡ．ＢＢＢ．Ａ．Ａ．Ａ```",
      num: "1.x和y的差",
      ans: "#include<iostrea>",
      item: {
        content: "#include<iostream> int b;",
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
      displaylanguage: '请选择编辑语言',
    };
  },
  methods: {
    // 获取题目
    async getproblem() {
      const { data: res } = await this.$http.get("problems/list?page_no=" + this.queryInfo.pagenum);
      if (res.meta.status !== 200) {
        return this.$message.error("获取用户列表失败！");
      }
      this.problemslist = res.data;
      // console.log(res)
    },
    // 返回主页
    gotohome() {
      this.$router.push("/topic")
    },
    onCmReady3() {
      this.$refs.myCmGenerate.codemirror.setSize("100%", "500px");
    },
    // 选择菜单的复制
    handleSelect(key, keyPath) {
       if(key === 'CPP')
        {
          this.displaylanguage = 'CPP';
          return;
        }
        if(key === 'C')
        {
          this.displaylanguage = 'C';
          return;
        }
        if(key === 'JAVA')
        {
          this.displaylanguage = 'JAVA';
          return;
        }
        if(key === 'PHP')
        {
          this.displaylanguage = 'PHP';
          return;
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
.submitjshao {
  width: 95%;
  background-color: #ebebeb;
  height: 60px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  padding-left: 20px;
  line-height: 60px;
}
.md {
  margin-top: 20px;
  width: 100%;
  height: 100%;
}
.heng {
  width: 100%;
  height: 10px;
  background-color: #f4f5f6;
}
.line {
  width: 5px;
  height: 100vh;
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
  height: 100%;
}
</style>
