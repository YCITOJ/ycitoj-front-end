<template>
  <el-container class="page">
    <el-header>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="题目:">
          <el-input v-model="formInline.problem"></el-input>
        </el-form-item>
        <el-form-item label="提交者:">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="语言:">
          <el-select v-model="formInline.region">
            <el-option label="CPP" value="shanghai"></el-option>
            <el-option label="JAVA" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="formInline.state">
            <el-option label="wo" value="shanghai"></el-option>
            <el-option label="ac" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-card>
        <el-table :data="resultslist" style="width: 100%">
          <el-table-column label="编号" width="100" prop="id"> </el-table-column>
          <el-table-column label="题目"> </el-table-column>
          <el-table-column label="状态" width="100" prop="verdict"> </el-table-column>
          <el-table-column label="分数" width="100"> </el-table-column>
          <el-table-column label="总时间" width="100" prop="cpu_time"> </el-table-column>
          <el-table-column label="内存" width="100" prop="memory"> </el-table-column>
          <el-table-column label="提交者" width="100"> </el-table-column>
          <el-table-column label="提交时间" width="100" prop="create_time"> </el-table-column>
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
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        problem: "",
        user: "",
        region: "",
        state: "",
      },
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5,
      },
      resultslist:[],
      total: 1,
      // 获取提交页面的请求数据
      condition_group1:{
        condition: 'prob_id=1 and who=1'
      },
      condition_group2:{
        page_no: 1,
        condition: 'who=1'
      }
    };
  },
  created(){
    this.getPageinfo(),
    this.getshow_per_page(),
    this.getresultslist()
  },
  methods: { 
    // 获取提交列表
    async getresultslist() {
      this.condition_group2.page_no = this.queryInfo.pagenum 
      const { data: res } = await this.$http.get("submit/get_submissions?page_no="+this.condition_group2.page_no+"&condition="+this.condition_group2.condition);
      /* if (res.meta.status !== 200) {
        return this.$message.error("获取题目列表表失败！");
      } */
      //console.log(res)
      this.resultslist= res.data;
    },
    // 提交页数以及提交数量
    async getPageinfo() {
      const { data: res } = await this.$http.get("submit/submission_info?condition="+this.condition_group1.condition);
      if (res.meta.status !== 200) {
        return this.$message.error("获取提交表数量失败！");
      }
      console.log(res)
      this.total = res.data.sub_cnt;
    },
    // 提交每一页的题目数量
    async getshow_per_page() {
      const { data: res } = await this.$http.get("submit/show_per_page/");
      if (res.meta.status !== 200) {
        return this.$message.error("获取提交表题目失败！");
      }
      //console.log(res);
      this.queryInfo.pagesize = res.data;
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      //this.queryInfo.pagesize = newSize;
      //this.getUserList();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getresultslist();
    },
    onSubmit() {
      console.log(this.region);
      console.log("submit!");
    },
  },
};
</script>
<style scoped>
.page {
  padding-top: 20px;
  padding-left: 5%;
  padding-right: 5%;
}
</style>
