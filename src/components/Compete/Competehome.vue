<template>
  <div class="box">
    <el-container>
      <!-- 头部 -->
      <h2>{{title}}</h2>
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
        <!-- 比赛内容 -->
        <el-card class="main_card">
          <div>
            <el-button type="primary" @click="registerRace" v-if="!checkUserRaceFlang">报名</el-button>
            <el-button type="primary" disabled v-if="checkUserRaceFlang">已报名</el-button>
            <el-button type="primary" @click="gotoRankList">排行榜</el-button>
            <el-button type="info" @click="gotoReviseRace">编辑</el-button>
            <el-button type="danger" @click="deleteRaceById">删除</el-button>
            <el-table :data="tableData" border style="width: 100%" v-if="checkUseraccess" @row-click="gotoSubmit">
              <el-table-column prop="date" label="状态" width="80">
              </el-table-column>
              <el-table-column prop="title" label="题目" width="800">
              </el-table-column>
              <el-table-column prop="address" label="统计"> </el-table-column>
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
        id: ""
      },
      // 检查用户报名情况参数
      checkUserRaceFlang: "",
      // 检查比赛是否开始和用户等级
      checkUseraccess: "",
    };
  },
  created() {
    this.getRaceList();
    this.checkUserRace();
  },
  methods: {
    async getRaceList() {
      const { data: res } = await this.$http.get(
        `contest/contest?id=${this.$route.query.id}`
      );
      console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error("获取题目列表失败！");
      }
      this.tableData = res.data.prob_list;
      this.value = res.data.information;
      this.title = res.data.title;
      if(window.localStorage.getItem("access") < 2) {
        this.checkUseraccess = true;
      } else if(Date.parse(new Date(res.data.start_time)) <　Date.parse(new Date(new Date()))){
        /* console.log(res.data.start_time)
        console.log(Date.parse(new Date(res.data.start_time)))
        console.log((new Date()).getTime())
        console.log(Date.parse(new Date(res.data.start_time)) <=　Date.parse(new Date(new Date()))); */
        this.checkUseraccess = true;
      } else {
        this.checkUseraccess = false;
      }

    },
    // 检查用户报名情况
    async checkUserRace() {
      const { data: res } = await this.$http.get(`contest/check_reg?contest_id=${this.$route.query.id}`);
      console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error("获取题目列表失败！");
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
      // console.log(confirmResult)
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      this.raceid.id = this.$route.query.id
      const { data: res } = await this.$http.post("contest/register",this.raceid);
      //console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success("报名比赛成功！");
      this.$router.push({ path: "/compete" });
    },
    // 进入比赛排行榜
    gotoRankList() {
      this.$router.push({path: "/ranklist",query: { id: this.$route.query.id }});
    },
    // 修改题目
    gotoReviseRace() {
      this.$router.push({path: "/revisecompete",query: { id: this.$route.query.id }});
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

      // console.log(confirmResult)
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      this.raceid.del_contest_id=this.$route.query.id
      const { data: res } = await this.$http.post("contest/del",this.raceid);
      //console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error("删除比赛失败！");
      }
      this.$message.success("删除比赛成功！");
      this.$router.push({ path: "/compete" });
    },
    gotoSubmit(row) {
      this.$router.push({ path: "/submitcompete", query: { id: row.num , competeid: this.$route.query.id } });
    }
  },
};
</script>
<style scoped>
.box {
  padding-left: 200px;
  padding-top: 20px;
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
