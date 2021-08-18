<template>
  <div class="box">
    <el-container>
      <!-- 头部 -->
      <h2>{{ classfrom.class_name }}</h2>
      <el-header class="header_title" height="550px">
        <div>
          <mavon-editor
            class="md"
            v-model="classfrom.intro"
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
            <el-button type="success" @click="invitation_code"
              >邀请码</el-button
            >
            <el-button type="success" @click="gotoAddHomework"
              >创建作业</el-button
            >
            <el-button type="primary" @click="goto_Student_List">学生列表</el-button>
            <el-button type="primary" @click="goto_Homework_List">作业列表</el-button>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column label="状态" width="80"> </el-table-column>
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
      classfrom: [],
    };
  },
  created() {
    this.getClassList();
  },
  methods: {
    // 获取班级信息
    async getClassList() {
      const { data: res } = await this.$http.get(
        `class/myclass?class_id=${this.$route.query.id}`
      );
      //console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.classfrom = res.data;
    },
    // 生成邀请码
    async invitation_code() {
      const { data: res } = await this.$http.get(
        `class/myclass/generate_invite_code?class_id=${this.$route.query.id}`
      );
      console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
       this.$notify({
          title: '邀请码',
          message: res.data,
          duration: 0
        });
    },
    // 创建作业
    gotoAddHomework() {
      this.$router.push({
        path: "/addhomework",
        query: { id: this.$route.query.id },
      });
    },
    // 学生列表
    goto_Student_List() {
      this.$router.push({
        path: "/studentlist",
        query: { id: this.$route.query.id },
      });
    },
    // 根据班级ID进入主要列表
    goto_Homework_List() {
      this.$router.push({
        path: "/homeworklist",
        query: { id: this.$route.query.id },
      });
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