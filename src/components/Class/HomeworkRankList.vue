<template>
  <div class="box"
  v-loading="loading"
   element-loading-text="拼命加载中"
   element-loading-spinner="el-icon-loading"
   element-loading-background="#ffffff">
    <el-header></el-header>
    <el-main>
      <el-table :data="rank_list" center>
        <el-table-column fixed type="index" label="序号"></el-table-column>
        <el-table-column fixed prop="class" label="班级" align="center" sortable>
        </el-table-column>
        <el-table-column fixed prop="name" label="姓名" align="center" sortable>
        </el-table-column>
        <el-table-column fixed prop="sno" label="学号" align="center" sortable>
        </el-table-column>
        <el-table-column fixed prop="score" label="得分" align="center" sortable>
        </el-table-column>
        <el-table-column
          v-for="(item, index) in headerlist"
          :key="index"
          :label="item.num"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <p
              class="submit_frequency"
              style="margin: 0; color: #67c23a"
              v-if="scope.row.prob_list[index].ac == true">
            +
            </p>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rank_list: [],
      headerlist: [],
      time: "",
      // 页面加载
      loading: true,
    };
  },
  created() {
    this.get_homework_rank_list();
  },
  methods: {
    async get_homework_rank_list() {
      const { data: res } = await this.$http.get(
        `homework/calc_rank_list?id=${this.$route.query.id}`
      );
      if (res.meta.status !== 200) {
        return this.$message.error("获取题目列表失败！");
      }
      this.rank_list = res.rank_list;
      if (res.rank_list.length != 0) this.headerlist = res.rank_list[0].prob_list;

      this.loading = false
    },

    formatTime(row, column) {
      const penalty = row[column.property];
      if (penalty% 60 < 10) {
        return parseInt(penalty / 60) + ":0" + (penalty % 60);
      } else {
        return parseInt(penalty / 60) + ":" + (penalty % 60);
      }
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
</style>
<style scoped>
</style>