<template>
  <el-container>
    <el-header>
      <el-menu
        class="el-menu-demo1"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item disabled index="1" class="log">YCITOJ</el-menu-item>
        <el-menu-item
          index="1"
          class="el-icon-house"
          @click="gotohome"
        ></el-menu-item>
        <el-menu-item index="2" @click="gotoproblemSubmit"
          >提交记录</el-menu-item
        >
        <el-menu-item index="3" v-if="is_admin" @click="editProblem"
          >编辑</el-menu-item
        >
        <el-menu-item index="4" v-if="is_admin" @click="upload"
          >上传样例</el-menu-item
        >
        <el-menu-item
          index="5"
          v-if="is_admin"
          @click="dialogVisible_tag = true"
          >编辑标签</el-menu-item
        >
      </el-menu>
    </el-header>
    <el-main>
      <div id="submit_problem_header">
        <div class="top_header" v-show="this.is_contest.where != 'contest'">
          <h2>#{{ info.num }}. {{ info.title }}</h2>
        </div>
        <div class="top_header" v-show="this.is_contest.where == 'contest'">
          <h2>#{{ this.is_contest.index }}. {{ info.title }}</h2>
        </div>
        <div class="left_header">
          <div class="button_div">
            <el-button type="danger" icon="el-icon-timer" size="mini"
              >{{ info.time_limit }}ms</el-button
            >
            <el-button type="primary" icon="el-icon-cpu" size="mini"
              >{{ info.memory_limit }}MB</el-button
            >
            <el-button
              type="success"
              size="mini"
              icon="el-icon-s-promotion"
              v-if="info.judge_type == 'spj'"
              >SPJ</el-button
            >
            <el-button
              type="info"
              size="mini"
              v-show="show_tag_button == false"
              @click="show_tag_button = true"
              >显示标签</el-button
            >
            <el-button
              type="info"
              size="mini"
              v-show="show_tag_button == true"
              @click="show_tag_button = false"
              >隐藏标签</el-button
            >
            <el-button
              size="mini"
              v-show="show_tag_button == true"
              v-for="(item, index) in pro_tag"
              :key="index"
              :style="{ '--backgroundcolor': item.color }"
              class="tag_button"
              >{{ item.name }}</el-button
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
      <el-container class="submit_box" id="submit_box">
        <el-header height="60px">
          <!-- 下拉框选择语言start -->
          <el-select v-model="displaylanguage">
            <el-option
              v-for="item in language"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
          <!-- 下拉框选择语言end -->
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
    </el-main>
    <!-- 上传文件页面Start -->
    <el-dialog title="上传文件" :visible.sync="dialogVisible" width="30%">
      <p>压缩包不要包含文件夹</p>
      <input type="file" @change="getFile($event)" class="up_things" />
      <el-button @click="uploadsubmit($event)">提交</el-button>
      <template>
        <el-table :data="file_form" style="width: 100%">
          <el-table-column prop="point" label="样例点"> </el-table-column>
        </el-table>
      </template>
    </el-dialog>
    <!-- 上传文件页面end -->

    <!-- 编辑标签Start -->
    <el-dialog title="编辑标签" :visible.sync="dialogVisible_tag" width="30%">
      <el-form ref="form" :model="add_tag" label-width="80px">
        <el-form-item label="标签名">
          <el-input v-model="add_tag.name"
            ><el-button
              slot="append"
              icon="el-icon-plus"
              @click="addTag"
            ></el-button
          ></el-input>
        </el-form-item>
      </el-form>
      <el-table :data="pro_tag" style="width: 100%">
        <el-table-column prop="id" label="编号" width="60">
        </el-table-column>
        <el-table-column prop="name" label="标签名">
        </el-table-column>
        <el-table-column label="操作" width="60">
        <template slot-scope="scope">
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click.native.stop="removeTagById(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
      </el-table>
    </el-dialog>
    <!--  添加标签end -->

    <!-- 滚动到提交区域 Start-->
    <el-button
      type="primary"
      icon="el-icon-bottom"
      id="find_submit_button"
      @click="find_submit"
      circle
    ></el-button>
    <!-- 滚动到提交区域 end-->
    <!-- 回到顶部插件 -->
    <el-backtop></el-backtop>
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

      // 控制上传文件对话框的关闭
      dialogVisible: false,
      // 上传附加数据
      uploadfile: "",
      uploadnum: "",
      // 获取样例点
      file_form: [],
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
      // 可以选择的语言
      language: [
        {
          value: "选项1",
          label: "cpp",
        },
        {
          value: "选项2",
          label: "python",
        },
        {
          value: "选项3",
          label: "merdog",
        },
      ],
      // 显示选择了什么语言
      displaylanguage: "cpp",
      // 查询提交结果
      submission_id: "",
      // 提交按钮是否可以点击
      submittijiaoflag: "true",

      is_admin: false,

      is_contest: {
        where: "",
        index: "",
      },

      // 添加标签id
      add_tag: {
        name: "",
      },
      pro_tag: [],
      dialogVisible_tag: false,
      show_tag_button: false,
    };
  },
  created() {
    this.check_access();
  },
  methods: {
    check_access() {
      this.is_contest.where = this.$route.query.where;
      if (this.is_contest.where == "contest") {
        this.is_contest.index = String.fromCharCode(
          Number(this.$route.query.index) + 65
        );
      }
      if (window.localStorage.getItem("access") <= 1) this.is_admin = true;
      else this.is_admin = false;
      this.readproblem();
      this.getTag();
    },
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
      //console.log(this.info.title.length);
    },
    // 返回主页
    gotohome() {
      this.$router.go(-1);
    },
    // 进去提交页面
    gotoproblemSubmit() {
      this.$router.push({ path: "/problemSubmit", query: { id: this.num } });
    },
    // codemirror页面大小设置
    onCmReady3() {
      this.$refs.myCmGenerate.codemirror.setSize("100%", "500px");
    },
    // 进入编辑题目界面
    editProblem() {
      this.$router.push({ path: "/revise", query: { id: this.num } });
    },
    // 提交代码
    async sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async submitcode() {
      /* 判断题库提交和比赛提交Start */
      if (this.$route.query.where != "contest") {
        this.submitstring.num = this.num;
        this.submitstring.lang = this.displaylanguage;
        this.submitstring.data = this.item.content;
        const { data: res } = await this.$http.post(
          "submit/submit_code/",
          this.submitstring
        );
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.message);
        }
        this.submission_id = res.data;
        this.submittijiaoflag = "false";
        this.ans = "评测中...";
        for (var i = 0; i <= 30; i++) {
          await this.sleep(1000);
          await this.outcome();
          if (this.ans == true) {
            this.submittijiaoflag = "true";
            return;
          }
        }
      } else {
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
        this.submittijiaoflag = "false";
        this.ans = "评测中...";
        for (var i = 0; i <= 20; i++) {
          await this.sleep(1000);
          await this.outcome();
          if (this.ans == true) {
            this.submittijiaoflag = "true";
            return;
          }
        }
      }
      /* 判断题库提交和比赛提交end */
    },
    async outcome() {
      const { data: res } = await this.$http.get(
        "submit/submission_result?submission_id=" + this.submission_id
      );
      if (res.meta.status !== 200) {
        return this.$message.error("提交反馈失败");
      }
      this.ans = true;
      if (res.verdict === 0 || res.verdict == null) {
        this.ans = false;
        return (this.ans = "评测中...");
      }
      if (res.verdict === 1) {
        return this.$message.error("Time Limit Exceeded.");
      }
      if (res.verdict === 2) {
        return this.$message.error("Memory Limit Exceeded.");
      }
      if (res.verdict === 3) {
        return this.$message.error("RunTime Error.");
      }
      if (res.verdict === 4) {
        return this.$message.error("未知错误!");
      }
      if (res.verdict === 5) {
        return this.$message.error("编译错误！");
      }
      if (res.verdict === 6) {
        return this.$message.success("恭喜你，通过了！");
      }
      if (res.verdict === 7) {
        return this.$message.error("回答错误！");
      }
      return this.$message.error("内部错误！");
    },

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
        "problems/upload_cases",
        formData
      );
      if (res.meta.status !== 200) {
        return this.$message.error("上传失败！");
      }
      this.$message.success("上传成功！");
      this.get_file_form();
    },
    upload() {
      this.uploadnum = this.$route.query.id;
      this.dialogVisible = true;
      this.file_form = [];
      this.get_file_form();
    },

    //添加标签
    async addTag() {
      const { data: res } = await this.$http.post("tag/add_prob_tag", {
        num: this.$route.query.id,
        name: this.add_tag.name,
      });
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success(res.meta.message);
      this.getTag();
    },
    //删除标签
    async removeTagById(id) {
      const { data: res } = await this.$http.post("tag/del_prob_tag", {
        num: this.$route.query.id,
        tag_id: id,
      });
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success(res.meta.message);
      this.getTag();
    },
    //获取标签
    async getTag() {
      const { data: res } = await this.$http.get(
        `tag/prob_tag?num=${this.$route.query.id}`
      );
      console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.pro_tag = res.data;
    },

    // 获取样例点
    async get_file_form() {
      const { data: res } = await this.$http.get(
        `problems/cases_list?num=${this.uploadnum}`
      );
      this.file_form = res.data.map((str) => {
        return { point: str };
      });
    },

    // 滚动到提交区域
    find_submit() {
      document
        .getElementById("submit_box")
        .scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>
<style scoped>
.el-menu-demo1 {
  position: relative;
  width: 100%;
  height: 60px;
}
.log {
  padding-right: 11%;
  font-size: 30px;
}
#submit_problem_header,
.md,
.submit_box {
  width: 60%;
  margin: auto;
}
#submit_problem_header .left_header {
  float: left;
  width: 60%;
  height: 90px;
}
#submit_problem_header .top_header {
  margin-left: 5px;
}
#submit_problem_header .left_header .button_div {
  margin-left: 5px;
}
#submit_problem_header .left_header .button_div button {
  padding: 6px 8px;
  margin-bottom: 2px;
}
.tag_button {
  background-color: var(--backgroundcolor);
  color: #fff;
}
#submit_problem_header .right_header {
  float: right;
  width: 40%;
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
  border-top: 1px solid #000;
}

.submit_box {
  margin-top: 20px;
}

/* find_submit_button */
#find_submit_button {
  position: fixed;
  top: 200px;
  left: 16%;
}
</style>
