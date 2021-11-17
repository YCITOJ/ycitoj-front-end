<template>
    <div
    v-loading="loading"
   element-loading-text="拼命加载中"
   element-loading-spinner="el-icon-loading"
   element-loading-background="#ffffff">
        <!-- 题目列表区域 -->
    <el-table
      :data="problemslist"
      stripe
      @row-click="gotosubmit"
    >
      <el-table-column label="提交状态" prop="ac" width="100" align="center">
        <template slot-scope="scope">
          <i class="el-icon-check" v-if="scope.row.ac"></i>
        </template>
      </el-table-column>
      <el-table-column label="编号" prop="num" width="100"></el-table-column>
      <el-table-column label="题目" prop="title"></el-table-column>
      <el-table-column label="难度" width="100">
        <template slot-scope="scope">
          <!-- v-bind:color="difficulty_color_form[scope.row.difficulty]" -->
          <el-tag
            :type="difficulty_form[scope.row.difficulty].type"
            effect="plain"
          >
            {{ difficulty_form[scope.row.difficulty].label }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    </div>
</template>
<script>
export default {
  data() {
    return {
      problemslist: [],
      // 难度等级
      difficulty_form: [
        {},
        { type: "", label: "入门" },
        { type: "success", label: "简单" },
        { type: "info", label: "中等" },
        { type: "danger", label: "较难" },
        { type: "warning", label: "困难" },
      ],
      // 页面加载
      loading: true,
    };
  },
  created() {
      this.get_problem_info()
  },
  methods: {
    async get_problem_info() {
      const { data: res } = await this.$http.get(
        `prob_collection/collection?id=${this.$route.query.id}`
      );
      if (res.meta.status === 400) {
        return this.$message.error(res.meta.message);
      }
      this.problemslist = res.data.prob_set
      this.loading = false
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
      if (this._isMobile()) {
        this.$router.push({ path: "/mobliesubmit", query: { id: row.num } });
      } else {
        this.$router.push({ path: "/submit", query: { id: row.num } });
      }
    },

  },
};
</script>