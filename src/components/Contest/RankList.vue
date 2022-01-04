<template>
  <div class="box">
    <el-header>
      <!-- 搜索区域 -->
          <el-row :gutter="6">
            <el-col :span="4">
              <el-input
                placeholder="参赛者id"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary">查询</el-button>
            </el-col>
          </el-row>
    </el-header>
    <el-main>
      <el-table :data="rank_list" :row-class-name="tableRowClassName" center>
        <el-table-column fixed prop="rank" label="名次" width="100" align="center">
        </el-table-column>
        <el-table-column fixed prop="name" label="参赛者" width="200">
        </el-table-column>
        <el-table-column fixed prop="solved" label="总分" width="120" align="center">
          <template slot-scope="scope">
            <p class="submit_frequency"
               style="margin: 0">
              {{scope.row.solved}}
            </p>
            <!-- 时间分钟不补零 -->
            <p class="submit_times"
               v-show="scope.row.penalty% 60 >= 10"
               style="margin: 0;color: #a39e9b"
            >
              ({{ parseInt(scope.row.penalty/60) }}:{{scope.row.penalty%60}})
            </p>
            <!-- 时间分钟补零 -->
            <p class="submit_times"
               v-show="scope.row.penalty% 60 < 10"
               style="margin: 0;color: #a39e9b"
            >
              ({{ parseInt(scope.row.penalty/60) }}:0{{scope.row.penalty%60}})
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
              style="margin: 0;color: #67c23a;font-size:20px;"
              v-if="scope.row.detail[index].ac == true&&scope.row.detail[index].tries==0"
            >
              <i class="el-icon-check"></i>
            </p>
            <!-- 提价n次 -->
            <p
              class="submit_frequency"
              style="margin: 0; color: #67c23a;font-size:20px"
              v-if="scope.row.detail[index].ac == true&&scope.row.detail[index].tries!=0"
            >
              +{{ scope.row.detail[index].tries}}
            </p>
            <!-- 时间分钟不补零 -->
            <p
              class="submit_times"
              style="margin: 0;color: #a39e9b"
              v-if="scope.row.detail[index].ac == true&&scope.row.detail[index].time%60>=10">
              ({{ parseInt(scope.row.detail[index].time/60) }}:{{scope.row.detail[index].time%60}})
            </p>
            <!-- 时间分钟补零 -->
            <p
              class="submit_times"
              style="margin: 0;color: #a39e9b"
              v-if="scope.row.detail[index].ac == true&&scope.row.detail[index].time%60<10">
              ({{ parseInt(scope.row.detail[index].time/60) }}:0{{scope.row.detail[index].time%60}})
            </p>
            <p
              class="submit_frequency"
              style="margin: 0; color: #f56c6c;font-size:20px"
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
    };
  },
  created() {
    this.getRankList();
    this.open3();
  },
  methods: {
    async getRankList() {
      const { data: res } = await this.$http.get(
        `contest/rank_list?contest_id=${this.$route.query.id}&page_no=${this.queryInfo.pagenum}`
      );
      console.log(res);
      if (res.meta.status !== 200) {
        return;
      }
      // 添加题目编号
      for(let item of res.data) {
        for(let i=0;i<item.detail.length;i++){
          item.detail[i].tag=String.fromCharCode(65+i);
        }
      }
      /* // 获取自己的排名
      let one_ranking=null;
      this.all_ranking = res.data.length;
      const my_name = window.localStorage.getItem("username");
      for(var i=0; i<this.all_ranking; i++) {
        if(res.data[i].name == my_name) {
          this.my_ranking = i+1;
          one_ranking=res.data[i];
          break;
        }
      }
      if(one_ranking!=null) {
        res.data.unshift(one_ranking)
      } */
      
      this.rank_list = res.data;
      if (res.data.length != 0) this.headerlist = res.data[0].detail;
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getRankList();
    },
    tableRowClassName({row, rowIndex}) {
        if (rowIndex == 1) {
          return 'success-row';
        }
        return '';
      },
    //弹框消息
    open3() {
        this.$notify.info({
          title: '消息',
          message: '排行榜每分钟更新一次！',
          duration: 0
        });
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
.el-table .success-row {
    background: #f0f9eb;
}
</style>