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
            <el-col :span="10">
              <el-input
                v-model="formInline.id"
                placeholder="用户编号"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="10">
              <el-input
                v-model="formInline.name"
                placeholder="用户名"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="get_user_list()"
                >查询</el-button
              >
            </el-col>
          </el-row>
        </el-header>
        <!-- 头部End -->
        <!-- 页面数据主体start -->
        <el-main>
          <el-table :data="resultslist" style="width: 100%" fit>
            <el-table-column
              label="用户编号"
              prop="id"
              align="center"
              width="210"
            ></el-table-column>
            <el-table-column
              label="用户名"
              prop="name"
              align="center"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!-- 修改按钮 -->
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click.native.stop="user_password(scope.row.id)"
                >重置密码</el-button>
                <!-- 删除按钮 -->
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click.native.stop="del_user(scope.row.id)"
                ></el-button>
              </template>
            </el-table-column>
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
        id: "",
        name: "",
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
    this.get_user_list();
  },
  methods: {
    // 获取提交列表
    async get_user_list() {
      const { data: res } = await this.$http.get(
        `admin/user_list?page_no=${this.queryInfo.pagenum}&id=${this.formInline.id}&name=${this.formInline.name}`
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
      this.get_user_list();
    },
    // 修改密码
    async user_password(id) {
       // 弹框询问用户是否修改密码
      const confirmResult = await this.$confirm(
        "此操作将修改该用户密码, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消修改");
      }
      const { data: res } = await this.$http.post("admin/update/user_password",{user_id: id,n_pass: '123456'});
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success('重置密码为123456');
    },
    // 删除用户
    async del_user(id) {
       // 弹框询问用户是否删除用户
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      const { data: res } = await this.$http.post("admin/del_user",{id: id});
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success(res.meta.message);
      this.get_user_list()();
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
