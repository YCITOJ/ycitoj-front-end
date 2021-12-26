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
            <el-col :span="20">
              <el-input
                v-model="formInline.class_name"
                placeholder="班级名称"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="get_auth_tab()"
                >查询</el-button
              >
            </el-col>
          </el-row>
        </el-header>
        <!-- 头部End -->
        <!-- 页面数据主体start -->
        <el-main>
          <el-table :data="resultslist" style="width: 100%" fit>
            <el-table-column label="学号" prop="sid" align="center"></el-table-column>
            <el-table-column label="姓名" prop="name" align="center"></el-table-column>
            <el-table-column label="班级名称" width="150" prop="class_name" align="center"></el-table-column>
          </el-table>
          <!-- 分页区域 -->
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-size="queryInfo.pagesize"
            layout="prev, next, jumper"
            :total="total"
          >
          </el-pagination>
        </el-main>
        <!-- 页面数据主体End -->
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
        class_name: "",
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
      loading: true,
    };
  },
  created() {
    this.get_auth_tab();
  },
  methods: {
    // 获取提交列表
    async get_auth_tab() {
      const { data: res } = await this.$http.get(
        `admin/auth_tab?page_no=${this.queryInfo.pagenum}&class_name=${this.formInline.class_name}`
      );
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
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.get_auth_tab();
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
