<template>
  <div
    class="discussbox"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="#ffffff"
  >
    <!-- 搜索与添加区域Start -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          placeholder="请输入讨论名称"
          v-model="queryInfo.query"
          clearable
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button icon="el-icon-plus" circle @click="addDiscusse"></el-button>
      </el-col>
    </el-row>
    <!-- 搜索与添加区域end -->
    <!-- 表格区域Start -->
    <el-table :data="discuss_list" style="width: 100%" @row-click="gotoDiscussContent">
      <el-table-column prop="title" label="标题" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="username" label="上传者" width="100" align="center"> </el-table-column>
      <el-table-column prop="create_time" label="更新时间" width="180"> </el-table-column>
       <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click.native.stop="showEditDialog(scope.row.id)"
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            v-show="userlevelFalg(scope.row.uploader)"
            @click.native.stop="removeDiscussById(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格区域end -->
    <!-- 分页区域Start -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-size="queryInfo.pagesize"
      layout="total, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 分页区域end -->
    <!-- 回到顶部插件 -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import "../Topic/style.js";
export default {
  data() {
    return {
      // 获取题目列表的参数对象
      queryInfo: {
        // 搜索区域
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 0,
      },
      total: 0,
      loading: false,
      // 讨论数量
      discuss_list:[],
    };
  },
  created() {
    this.getPageinfo();
  },
  methods: {
    // 获取讨论
    async  getDiscussList() {
      const { data: res } = await this.$http.get(`discussion/list?page_no=${this.queryInfo.pagenum}`);
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.discuss_list = res.data;
    },
    // 题目个数以及每页题目数量
    async getPageinfo() {
      const { data: res } = await this.$http.get("discussion/topic_count");
      if (res.meta.status !== 200) {
        return this.$message.error("获取题目列表失败！");
      }
      this.total = res.count;
      this.queryInfo.pagesize = res.show_per_page;
      this.getDiscussList();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getDiscussList();
    },
    // 跳转到添加讨论
    addDiscusse() {
      this.$router.push("/adddiscuss");
    },
    // 修改帖子
    showEditDialog(num) {
      this.$router.push({ path: "/revisediscuss", query: { id: num } });
    },
    // 删除帖子
    async  removeDiscussById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该帖子, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      const { data: res } = await this.$http.post("discussion/delete_topic",{topic_id:id});
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success(res.meta.message);
      this.getDiscussList();
    },
    // 跳转到讨论页面
    gotoDiscussContent(row) {
      this.$router.push({path:'/discusscontent', query: { id: row.id } });
    },
    // 判断用户是否可以删除
    userlevelFalg(id) {
      let userid = window.localStorage.getItem("userid");
      let access = window.localStorage.getItem("access");
      if(id==userid||access<=1) {
        return true;
      } else {
        return false;
      }
    }
  },
};
</script>
<style scoped>
.discussbox {
  width: 80%;
  margin: 20px auto;
}
.el-table {
  margin-top: 20px;
}
</style>
