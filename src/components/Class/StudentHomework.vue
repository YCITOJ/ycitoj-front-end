<template>
  <div
    class="box"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="#ffffff"
  >
    <el-container>
      <!-- 头部 -->
      <h2>{{ title }}</h2>
      <el-header class="header_title" height="550px">
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
      </el-header>
      <el-main class="mainthins">
        <!-- 作业内容 -->
        <el-card class="main_card">
          <div>
            <el-button type="primary" @click="goto_homework_rank_list"
              >排行榜</el-button
            >
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              @row-click="gotosubmit"
            >
              <el-table-column label="状态" width="80" align="center">
                <template slot-scope="scope">
                  <i class="el-icon-check" v-if="scope.row.ac"></i>
                </template>
              </el-table-column>
              <el-table-column label="编号" prop="id" width="100" align="center">
              </el-table-column>
              <el-table-column prop="name" label="题目">
              </el-table-column>
              <el-table-column prop="score" label="分值" width="50" align="center"> </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      value: "",
      title: "",
      raceid: {
        del_contest_id: "",
        id: "",
      },
      // 检查用户报名情况参数
      checkUserRaceFlang: "",
      // 用户等级
      userlevel: "",
      // 页面加载
      loading: true,
    };
  },
  created() {
    this.getHomeworkList();
  },
  methods: {
    async getHomeworkList() {
      const { data: res } = await this.$http.get(
        `homework/homework?id=${this.$route.query.id}`
      );
      if (res.meta.status !== 200) {
        return this.$message.error("获取题目列表失败！");
      }
      console.log(res)
      this.tableData = res.data.prob_list;
      this.value = res.data.information;
      this.title = res.data.title;
      // 加载特效
      this.loading = false;
    },
    // 进入比赛排行榜
    goto_homework_rank_list() {
      this.$router.push({
        path: "/homework_rank_list",
        query: { id: this.$route.query.id },
      });
    },
     // 进入题目
    // 判断是否是移动端
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    // 进入移动端或pc端
    gotosubmit(row) {
      console.log(row)
      if (this._isMobile()) {
        this.$router.push({ path: "/mobliesubmit", query: { id: row.id } });
      } else {
        this.$router.push({ path: "/submit", query: { id: row.id } });
      }
    },

    // 获取用户等级
    getuserlevel() {
      if (window.localStorage.getItem("access") <= 1) this.userlevel = 1;
    },
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
.header_title {
  width: 80%;
  background-color: black;
}
.md {
  height: 550px;
}
.mainthins {
  padding-top: 50px;
}
.main_card {
  width: 80%;
}
.el-table {
  margin-top: 30px;
}
</style>
