<template>
  <div class="box">
    <el-header>Header</el-header>
    <el-main>
      <el-table :data="rank_list">
        <el-table-column fixed prop="rank" label="排名" width="100">
        </el-table-column>
        <el-table-column fixed prop="name" label="姓名" width="100">
        </el-table-column>
        <el-table-column fixed prop="solved" label="解题数" width="120">
        </el-table-column>
        <el-table-column fixed prop="penalty" label="罚时" width="120">
        </el-table-column>
        <el-table-column
          v-for="(item, index) in headerlist"
          :key="index"
          :label="item.tag"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <p class="submit_frequency" style="margin: 0; color: #67C23A;" v-if="scope.row.prob_list[index].ac == true">+{{ scope.row.prob_list[index].tries }}</p>
            <p class="submit_times" style="margin: 0;"  v-if="scope.row.prob_list[index].ac == true">({{ scope.row.prob_list[index].time}})</p>
            <p class="submit_frequency" style="margin: 0; color: #F56C6C;" v-if="scope.row.prob_list[index].ac == false&&scope.row.prob_list[index].tries!=0">-{{ scope.row.prob_list[index].tries }}</p>
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
    };
  },
  created() {
    this.getRankList();
  },
  methods: {
      async getRankList() {
         const { data: res } = await this.$http.get(
        `contest/rank_list?contest_id=${this.$route.query.id}`
      );
      if (res.meta.status !== 200) {
        return this.$message.error("获取题目列表失败！");
      }
      //console.log(res) 
      this.rank_list = res.data;
      this.headerlist = res.data[0].prob_list
      }
  },
};
</script>
<style scoped>
.box {
  width: 80%;
  padding-left: 10%;
}
</style>
<style scoped>
</style>