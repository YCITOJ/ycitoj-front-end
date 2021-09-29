<template>
  <div class="box">
    <el-header></el-header>
    <el-main>
      <div class="my_rank">
        您的排名：{{my_ranking}}/{{all_ranking}}
      </div>
      <el-table :data="rank_list" center>
        <el-table-column fixed type="index" label="排名" width="100" align="center">
        </el-table-column>
        <el-table-column fixed prop="name" label="姓名" width="100" align="center">
        </el-table-column>
        <el-table-column fixed prop="solved" label="解题数" width="120" align="center">
        </el-table-column>
        <el-table-column
          fixed
          prop="penalty"
          :formatter="formatTime"
          label="罚时"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          v-for="(item, index) in headerlist"
          :key="index"
          :label="item.tag"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <!-- 提交一次正确 -->
            <p
              class="submit_frequency"
              style="margin: 0; color: #67c23a"
              v-if="scope.row.prob_list[index].ac == true&&scope.row.prob_list[index].tries==1"
            >
              +
            </p>
            <!-- 提价n次 -->
            <p
              class="submit_frequency"
              style="margin: 0; color: #67c23a"
              v-if="scope.row.prob_list[index].ac == true&&scope.row.prob_list[index].tries!=1"
            >
              +{{ scope.row.prob_list[index].tries-1 }}
            </p>
            <!-- 时间分钟不补零 -->
            <p
              class="submit_times"
              style="margin: 0"
              v-if="scope.row.prob_list[index].ac == true&&scope.row.prob_list[index].time%60>=10">
              ({{ parseInt(scope.row.prob_list[index].time/60) }}:{{scope.row.prob_list[index].time%60}})
            </p>
            <!-- 时间分钟补零 -->
            <p
              class="submit_times"
              style="margin: 0"
              v-if="scope.row.prob_list[index].ac == true&&scope.row.prob_list[index].time%60<10">
              ({{ parseInt(scope.row.prob_list[index].time/60) }}:0{{scope.row.prob_list[index].time%60}})
            </p>
            <p
              class="submit_frequency"
              style="margin: 0; color: #f56c6c"
              v-if="
                scope.row.prob_list[index].ac == false &&
                scope.row.prob_list[index].tries != 0
              "
            >
              -{{ scope.row.prob_list[index].tries }}
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

      my_ranking: '暂无数据',
      all_ranking: '',
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
        return;
      }
      this.rank_list = res.data;
      if (res.data.length != 0) this.headerlist = res.data[0].prob_list;

      this.get_my_ranking()
    },

    formatTime(row, column) {
      const penalty = row[column.property];
      if (penalty% 60 < 10) {
        return parseInt(penalty / 60) + ":0" + (penalty % 60);
      } else {
        return parseInt(penalty / 60) + ":" + (penalty % 60);
      }
    },

    // 获取自己的排名
    get_my_ranking() {
      this.all_ranking = this.rank_list.length
      const my_name = window.localStorage.getItem("username")
      for(var i=0; i<this.all_ranking; i++) {
        if(this.rank_list[i].name == my_name) {
          this.my_ranking = i+1;
        }
      }
    }
  },
};
</script>
<style scoped>
.box {
  width: 80%;
  padding-left: 10%;
}
.my_rank {
  margin-bottom: 10px;
  margin-left: 20px;
}
</style>