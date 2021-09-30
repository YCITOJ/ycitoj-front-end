<template>
  <div class="box"
  v-loading="loading"
   element-loading-text="拼命加载中"
   element-loading-spinner="el-icon-loading"
   element-loading-background="#ffffff">
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
      <!--  时间条 -->
      <el-main class="mainthins">
        <div class="time">
          <el-progress
            :text-inside="true"
            :stroke-width="30"
            :percentage="percentage_count"
            status="success"
            :format="format"
          ></el-progress>
        </div>
        <!-- 比赛内容 -->
        <el-card class="main_card">
          <div>
            <el-button
              type="primary"
              @click="registerRace"
              v-if="!checkUserRaceFlang"
              >报名</el-button
            >
            <el-button type="primary" disabled v-if="checkUserRaceFlang"
              >已报名</el-button
            >
            <el-button type="primary" @click="gotoRankList">排行榜</el-button>
            <el-button type="info" @click="gotoReviseRace" v-if="userlevel == 1"
              >编辑</el-button
            >
            <el-button
              type="danger"
              @click="deleteRaceById"
              v-if="userlevel == 1"
              >删除</el-button
            >
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              @row-click="gotoSubmit"
            >
              <el-table-column label="状态" width="60">
                <template slot-scope="scope">
                  <i class="el-icon-check" v-if="scope.row.ac"></i>
                </template>
              </el-table-column>
              <el-table-column label="编号" type="index" :index="indexMethod" width="60" align="center">
                </el-table-column>
              <el-table-column prop="title" label="题目" :show-overflow-tooltip="true">
              </el-table-column>
              <!-- <el-table-column prop="address" label="统计"> </el-table-column> -->
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
      // 检查比赛是否开始和用户等级
      checkUseraccess: "",
      checkAc: "",
      // 用户等级
      userlevel: "",

      //剩余时间
      rank_start_time: "",
      rank_end_time: "",
      down_time: "",
      percentage_count: "0",
      // 页面加载
      loading: true,
    };
  },
  created() {
    this.getRaceList();
    this.getuserlevel();
  },
  mounted() {
    let timer = setInterval(() => {
      this.timeDown();
    }, 1000);

    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
  methods: {
    async getRaceList() {
      const { data: res } = await this.$http.get(
        `contest/contest?id=${this.$route.query.id}`
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.tableData = res.data.prob_list;
      this.value = res.data.information;
      this.title = res.data.title;
      this.rank_start_time = res.data.start_time;
      this.rank_end_time = res.data.end_time;
      this.checkUserRace();
      this.loading = false
    },
    // 检查用户报名情况
    async checkUserRace() {
      const { data: res } = await this.$http.get(
        `contest/check_reg?contest_id=${this.$route.query.id}`
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.checkUserRaceFlang = res.verdict;
    },
    // 注册比赛
    async registerRace() {
      // 弹框询问用户是否报名比赛
      const confirmResult = await this.$confirm(
        "此操作报名该比赛, 是否继续?",
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
      this.raceid.id = this.$route.query.id;
      const { data: res } = await this.$http.post(
        "contest/register",
        this.raceid
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success("报名比赛成功！");
      this.$router.push({ path: "/compete" });
    },
    // 进入比赛排行榜
    gotoRankList() {
      this.$router.push({
        path: "/ranklist",
        query: { id: this.$route.query.id },
      });
    },
    // 修改题目
    gotoReviseRace() {
      this.$router.push({
        path: "/revisecompete",
        query: { id: this.$route.query.id },
      });
    },
    // 删除比赛
    async deleteRaceById() {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该比赛, 是否继续?",
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
      this.raceid.del_contest_id = this.$route.query.id;
      const { data: res } = await this.$http.post("contest/del", this.raceid);
      if (res.meta.status !== 200) {
        return this.$message.error("删除比赛失败！");
      }
      this.$message.success("删除比赛成功！");
      this.$router.push({ path: "/compete" });
    },
    gotoSubmit(row) {
      this.$router.push({
        path: "/submitcompete",
        query: { id: row.num, competeid: this.$route.query.id },
      });
    },
    // 获取用户等级
    getuserlevel() {
      if (window.localStorage.getItem("access") <= 1) this.userlevel = 1;
    },

    convertDateFromString(dateString) {
      if (dateString) {
        var arr1 = dateString.split(" ");
        var sdate = arr1[0].split("-");
        arr1 = arr1[1].split(":");
        var date = new Date(
          sdate[0],
          sdate[1] - 1,
          sdate[2],
          arr1[0],
          arr1[1],
          arr1[2]
        );
        return date;
      }
      return new Date();
    },
    format(percentage) {
      return percentage === 0 ? "已结束" : `${this.down_time}`;
    },
    timeDown() {
      const startTime = this.convertDateFromString(this.rank_start_time);
      const endTime = this.convertDateFromString(this.rank_end_time);
      const nowTime = new Date();
      let countTime = parseInt(
        (endTime.getTime() - startTime.getTime()) / 1000
      );
      let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
      if (leftTime <= 0) {
        this.down_time = `已结束`;
        this.percentage_count = 0;
        return;
      } else if (leftTime > countTime) {
        this.down_time = `未开始`;
        this.percentage_count = 100;
        return;
      }
      let h = parseInt(leftTime / (60 * 60));
      let m = this.formate(parseInt((leftTime / 60) % 60));
      let s = this.formate(parseInt(leftTime % 60));

      this.down_time = `${h}:${m}:${s}`;
      this.percentage_count = (leftTime / countTime) * 100;
    },
    formate(time) {
      if (time >= 10) {
        return time;
      } else {
        return `0${time}`;
      }
    },
    // 题目编号
    indexMethod(index) {
        return String.fromCharCode(65+index);
    }
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

.time {
  width: 80%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.md {
  height: 550px;
}

.main_card {
  width: 80%;
}
.el-table {
  margin-top: 30px;
}
</style>
