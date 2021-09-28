<template>
  <el-container class="page">
    <el-header>
    </el-header>
    <el-main>
      <el-table :data="resultslist" style="width: 100%" border fit>
        <el-table-column label="编号" width="60" prop="id" align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click="dialogcode(scope.row)">{{
              scope.row.id
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="题目编号" prop="prob_id" align="center" width="150">
          <template slot-scope="scope">
            <el-link type="info" @click="gotosubmit(scope.row)">{{
              scope.row.prob_id
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120" prop="verdict" align="center">
          <template slot-scope="scope">
            <el-link
              type="success"
              :underline="false"
              v-if="scope.row.verdict == 'AC'"
              >{{ scope.row.verdict }}</el-link
            >
            <el-link
              type="danger"
              :underline="false"
              v-if="scope.row.verdict == 'WA'"
              >{{ scope.row.verdict }}</el-link
            >
            <el-link
              type="warning"
              :underline="false"
              v-if="(scope.row.verdict != 'AC') & (scope.row.verdict != 'WA')"
              >{{ scope.row.verdict }}</el-link
            >
          </template>
        </el-table-column>
         <el-table-column label="时间(ms)" width="150" prop="cpu_time" align="center">
        </el-table-column>
         <el-table-column label="内存(KB)" width="150" prop="memory" align="center">
        </el-table-column>
        <el-table-column label="语言" width="80" prop="lang" align="center">
        </el-table-column>
        <el-table-column label="提交时间" prop="create_time" align="center">
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-size="queryInfo.pagesize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-main>
    <el-dialog title="代码" :visible.sync="displayedcode">
      <el-row :gutter="3">
        <el-col :span="3"><h2 class="copy_title">源代码</h2></el-col>
        <el-col :span="2">
          <el-button
            size="mini"
            :data-clipboard-text="raw_value"
            class="copy_css"
            @click="copy"
            id="copy_text"
            >复制</el-button
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
  </el-container>
</template>
<script>
import Clipboard from "clipboard";
export default {
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5,
      },
      resultslist: [],
      total: 1,
      // 获取提交页面的请求数据
      condition_group: {
        page_no: 1,
        condition: "",
      },
      //代码的显示
      displayedcode: false,
      //代码内容
      value: "",
      // 源代码，用于复制
      raw_value: ""
    };
  },
  created() {
    this.getuserid();
  },
  methods: {
    getuserid() {
      this.condition_group.condition = "prob_id=\""+this.$route.query.id+"\" and who=";
      this.condition_group.condition = this.condition_group.condition + window.localStorage.getItem("userid");
      this.getPageinfo();
      this.getshow_per_page();
      this.getresultslist();
    },
    // 获取提交列表
    async getresultslist() {
      this.condition_group.page_no = this.queryInfo.pagenum;
      const { data: res } = await this.$http.get(
        "submit/get_submissions?page_no=" +
          this.condition_group.page_no +
          "&condition=" +
          this.condition_group.condition
      );
      if (res.meta.status !== 200) {
        return;
      }
      
      this.resultslist = res.data;
    },
    // 提交页数以及提交数量
    async getPageinfo() {
      const { data: res } = await this.$http.get(
        "submit/submission_info?condition=" + this.condition_group.condition
      );
      if (res.meta.status === 403) {
        return this.$message.error("请先登录！");
      }
      if (res.meta.status !== 200) {
        return;
      }
      this.total = res.data.sub_cnt;
    },
    // 提交每一页的题目数量
    async getshow_per_page() {
      const { data: res } = await this.$http.get("submit/show_per_page");
      if (res.meta.status !== 200) {
        return;
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
      this.getresultslist();
    },
    // 显示提交的代码
    dialogcode(row) {
      this.displayedcode = true;
      this.value = "```" + row.lang + "\n" + row.code;
      this.raw_value = row.code;
    },
    // 进去题目
    gotosubmit(row) {
      this.$router.push({ path: "/submit", query: { id: row.prob_id } });
    },
    // 复制代码
    copy() {
    var _this=this;
    var clipboard=new Clipboard('#copy_text');
    clipboard.on('success', e=> {
        this.$message.success('复制成功');
        // 释放内存
        clipboard.destroy()
    }),
    clipboard.on('error', e=> {
        // 不支持复制
        Message( {
        message: '该浏览器不支持自动复制', 
        type: 'warning'
        });
        // 释放内存
        clipboard.destroy()
    })}
  },
};
</script>
<style scoped>
.page {
  padding-top: 20px;
  padding-left: 15%;
  padding-right: 15%;
}
.copy_css {
  margin-top: 18.5px;
  margin-left: -10px;
}
</style>
