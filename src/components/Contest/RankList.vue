<template>
  <div class="box">
    <el-header>
      <!-- 搜索区域 -->
      <el-row :gutter="6">
        <el-col :span="4">
          <el-input
            v-model="my_list"
            placeholder="用户名"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="findMyRank">查询</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table :data="rank_list" :row-class-name="tableRowClassName" center>
        <el-table-column
          fixed
          prop="rank"
          label="名次"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column fixed prop="name" label="参赛者" width="200">
        </el-table-column>
        <el-table-column
          fixed
          prop="solved"
          label="总分"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <p class="submit_frequency" style="margin: 0">
              {{ scope.row.solved }}
            </p>
            <!-- 时间分钟不补零 -->
            <p
              class="submit_times"
              v-show="scope.row.penalty % 60 >= 10"
              style="margin: 0; color: #a39e9b"
            >
              ({{ parseInt(scope.row.penalty / 60) }}:{{
                scope.row.penalty % 60
              }})
            </p>
            <!-- 时间分钟补零 -->
            <p
              class="submit_times"
              v-show="scope.row.penalty % 60 < 10"
              style="margin: 0; color: #a39e9b"
            >
              ({{ parseInt(scope.row.penalty / 60) }}:0{{
                scope.row.penalty % 60
              }})
            </p>
          </template>
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
              style="margin: 0; color: #67c23a; font-size: 20px"
              v-if="
                scope.row.detail[index].ac == true &&
                scope.row.detail[index].tries == 0
              "
            >
              <i class="el-icon-check"></i>
            </p>
            <!-- 提价n次 -->
            <p
              class="submit_frequency"
              style="margin: 0; color: #67c23a; font-size: 20px"
              v-if="
                scope.row.detail[index].ac == true &&
                scope.row.detail[index].tries != 0
              "
            >
              +{{ scope.row.detail[index].tries }}
            </p>
            <!-- 时间分钟不补零 -->
            <p
              class="submit_times"
              style="margin: 0; color: #a39e9b"
              v-if="
                scope.row.detail[index].ac == true &&
                scope.row.detail[index].time % 60 >= 10
              "
            >
              ({{ parseInt(scope.row.detail[index].time / 60) }}:{{
                scope.row.detail[index].time % 60
              }})
            </p>
            <!-- 时间分钟补零 -->
            <p
              class="submit_times"
              style="margin: 0; color: #a39e9b"
              v-if="
                scope.row.detail[index].ac == true &&
                scope.row.detail[index].time % 60 < 10
              "
            >
              ({{ parseInt(scope.row.detail[index].time / 60) }}:0{{
                scope.row.detail[index].time % 60
              }})
            </p>
            <p
              class="submit_frequency"
              style="margin: 0; color: #f56c6c; font-size: 20px"
              v-if="
                scope.row.detail[index].ac == false &&
                scope.row.detail[index].tries != 0
              "
            >
              -{{ scope.row.detail[index].tries }}
            </p>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        layout="prev, next, jumper"
      >
      </el-pagination>
    </el-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
      },
      rank_list: [],
      headerlist: [],
      time: "",
      my_list: "",
      //判断用户是否参赛
      attend: false
    };
  },
  created() {
    this.getRankList();
  },
  methods: {
    async getRankList() {
      const { data: res } = await this.$http.get(
        `contest/rank_list?contest_id=${this.$route.query.id}&page_no=${this.queryInfo.pagenum}`
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      // 添加题目编号
      for (let item of res.data) {
        for (let i = 0; i < item.detail.length; i++) {
          item.detail[i].tag = String.fromCharCode(65 + i);
        }
      }
      // 获取自己的排名
      const { data: res1 } = await this.$http.get(
        `contest/my_rank?contest_id=${this.$route.query.id}`
      );
      if (res1.meta.status !== 200) {
        this.rank_list = res.data;
        if (res.data.length != 0) this.headerlist = res.data[0].detail;
        return;
      }
      this.attend = true;
      res.data.unshift(res1.data);
      this.rank_list = res.data;
      if (res.data.length >1) this.headerlist = res.data[1].detail;
    },
    async findMyRank() {
      const { data: res } = await this.$http.get(
        `contest/find_rank?contest_id=${this.$route.query.id}&name=${this.my_list}`
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.attend = false;
      this.rank_list = [res.data];
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getRankList();
    },
    // 设置表格行格式
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex == 0&&this.attend==true) {
        return 'success-row'
      }
      if(rowIndex ==0 ) {
        return 'color: #f2;'
      }
      return "";
    },
  },
};
</script>
<style scoped>
.box {
  width: 80%;
  margin: 20px auto;
}
</style>