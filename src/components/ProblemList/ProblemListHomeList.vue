<template>
    <div>
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
    },
    // 进入题目
    gotosubmit(row) {
      this.$router.push({ path: "/submit", query: { id: row.num } });
    },
  },
};
</script>