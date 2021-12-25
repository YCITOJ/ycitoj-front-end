<template>
  <div class="submit-server-box">
    <el-card>
      <!-- 加载页面特效 -->
      <el-container
        class="page"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#ffffff"
      >
        <!-- ---------------------------------- -->
        <!-- 头部Start -->
        <el-header>
          <!-- 搜索区域 -->
          <el-row :gutter="6">
            <el-col :span="4">
              <el-input
                v-model="formInline.num"
                placeholder="题目编号"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-input
                v-model="formInline.who"
                placeholder="提交者"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-select v-model="formInline.lang" placeholder="请选择语言" clearable>
                <el-option
                  v-for="item in lang"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <span style="float: left">{{ item.label }}</span>
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="formInline.verdict" placeholder="请选择状态" clearable>
                <el-option
                  v-for="item in verdict"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <span style="float: left">{{ item.label }}</span>
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="getresultslist()">查询</el-button>
            </el-col>
          </el-row>
        </el-header>
        <!-- 头部End -->
        <!-- 页面数据主体start -->
        <el-main>
          <el-table :data="resultslist" style="width: 100%" fit>
            <el-table-column label="编号" width="100" prop="id" align="center">
              <template slot-scope="scope">
                <el-link type="primary" @click="dialogcode(scope.row)">{{
                  scope.row.id
                }}</el-link>
              </template>
            </el-table-column>
            <el-table-column
              label="提交者"
              width="150"
              prop="username"
              align="center"
            ></el-table-column>
            <el-table-column
              label="题目编号"
              prop="prob_id"
              align="center"
              min-width="150"
            >
              <template slot-scope="scope">
                <el-link type="info" @click="gotosubmit(scope.row)">{{
                  scope.row.prob_id
                }}</el-link>
              </template>
            </el-table-column>
            <el-table-column label="状态" prop="verdict" align="center">
              <template slot-scope="scope">
                <el-link
                  type="success"
                  :underline="false"
                  v-if="scope.row.verdict == '6'"
                  ><i class="el-icon-check"></i> Accepted</el-link
                >
                <el-link
                  type="danger"
                  :underline="false"
                  v-if="scope.row.verdict == '7'"
                  ><i class="el-icon-close"></i> Wrong Answer</el-link
                >
                <el-link
                  type="warning"
                  :underline="false"
                  v-if="scope.row.verdict == '1'"
                  ><i class="el-icon-time"></i> Time Limit Exceeded</el-link
                >
                <el-link
                  type="warning"
                  :underline="false"
                  v-if="scope.row.verdict == '5'"
                  ><i class="el-icon-document-delete"></i> Compile
                  Error</el-link
                >
                <el-link
                  type="warning"
                  :underline="false"
                  v-if="scope.row.verdict == '0'"
                  >正在测评</el-link
                >
                <el-link
                  type="warning"
                  :underline="false"
                  v-if="scope.row.verdict == '2'"
                  >Memory Limit Exceeded</el-link
                >
                <el-link
                  type="warning"
                  :underline="false"
                  v-if="scope.row.verdict == '3'"
                  >Runtime Error
                </el-link>
                <el-link
                  type="warning"
                  :underline="false"
                  v-if="scope.row.verdict == '4'"
                  >未知错误</el-link
                >
              </template>
            </el-table-column>
            <el-table-column
              label="时间(ms)"
              width="150"
              prop="cpu_time"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="内存(KB)"
              width="150"
              prop="memory"
              align="center"
            >
            </el-table-column>
            <el-table-column label="语言" width="80" prop="lang" align="center">
            </el-table-column>
            <el-table-column
              label="提交时间"
              prop="create_time"
              align="center"
              width="200"
            >
            </el-table-column>
          </el-table>
          <!-- 分页区域 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-size="queryInfo.pagesize"
            layout="prev, next, jumper"
            :total="total"
          >
          </el-pagination>
        </el-main>
        <!-- 页面数据主体End -->

        <el-dialog title="代码" :visible.sync="displayedcode">
          <el-row :gutter="3">
            <el-col :span="3"><h2 class="copy_title">测试信息</h2></el-col>
            <el-col :span="2">
              <el-button
                size="mini"
                :data-clipboard-text="raw_value"
                class="copy_css"
                @click="copy"
                id="copy_text"
                >复制代码</el-button
              >
            </el-col>
          </el-row>
          <div>
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
          </div>
        </el-dialog>
        <el-backtop></el-backtop>
      </el-container>
    </el-card>
  </div>
</template>
<script>
import Clipboard from "clipboard";
export default {
  data() {
    return {
      // 搜索列表
      formInline: {
        page_no: 1,
        who: "",
        num: "",
        lang: "",
        verdict: "",
      },
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5,
      },
      resultslist: [],
      total: 10000,
      //代码的显示
      displayedcode: false,
      //代码内容
      value: "",
      // 源代码，用于复制
      raw_value: "",
      loading: true,
      //用于搜索选择语言
      lang: [
        {value: 'cpp',label: 'C++'},
        {value: 'java',label: 'Java'},
        {value: 'python',label: 'Python'},
        {value: 'merdog',label: 'Merdog'}
      ],
      //用于搜索状态
      verdict: [
        {value: '6',label: 'Accepted'},
        {value: '7',label: 'Wrong Answer'},
        {value: '1',label: 'Time Limit Exceeded'},
        {value: '2',label: 'Memory Limit Exceeded'},
        {value: '0',label: '正在测评'},
      ]
    };
  },
  created() {
    this.getresultslist();
  },
  methods: {
    // 获取提交列表
    async getresultslist() {
      const { data: res } = await this.$http.get(
        `submit/all_submissions?page_no=${this.formInline.page_no}&who=${this.formInline.who}&num=${this.formInline.num}&lang=${this.formInline.lang}&verdict=${this.formInline.verdict}`
      );
      console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.resultslist = res.data;
      this.loading = false;
    },
    // 提交每一页的题目数量
    async getshow_per_page() {
      const { data: res } = await this.$http.get("submit/show_per_page");
      if (res.meta.status !== 200) {
        return console.log("获取提交表题目失败！");
      }
      this.queryInfo.pagesize = res.data;
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      //this.queryInfo.pagesize = newSize;
      //this.getUserList();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.formInline.page_no = newPage;
      this.getresultslist();
    },
    // 显示提交的代码
    dialogcode(row) {
      //console.log(row);
      this.value = "```" + row.lang + "\n" + row.code;
      this.raw_value = row.code;
      this.value += "\n```\n";
      let t = 1;
      let check_log = JSON.parse(row.check_log);
      // cases_info 每个测试点返回的信息
      for (let cases_info of check_log) {
        this.value += `##### 测试点 ${t++}, 用时:${
          cases_info.time_usage
        } ms, 内存用量:${cases_info.mem_usage} KB \n \`\`\`\n ${
          cases_info.msg
        }\n \`\`\`\n`;
      }
      this.displayedcode = true;
      //console.log(this.value)
    },
    // 进去题目
    gotosubmit(row) {
      // console.log(row)
      this.$router.push({ path: "/submit", query: { id: row.prob_id } });
    },
    // 复制代码
    copy() {
      var _this = this;
      var clipboard = new Clipboard("#copy_text");
      clipboard.on("success", (e) => {
        this.$message.success("复制成功");
        // 释放内存
        clipboard.destroy();
      }),
        clipboard.on("error", (e) => {
          // 不支持复制
          Message({
            message: "该浏览器不支持自动复制",
            type: "warning",
          });
          // 释放内存
          clipboard.destroy();
        });
    },
  },
};
</script>
<style scoped>
.submit-server-box {
  margin: 20px;
}
.copy_css {
  margin-top: 18.5px;
  margin-left: -10px;
}
</style>
