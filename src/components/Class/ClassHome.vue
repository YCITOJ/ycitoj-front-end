<template>
  <div class="box"
  v-loading="loading"
   element-loading-text="拼命加载中"
   element-loading-spinner="el-icon-loading"
   element-loading-background="#ffffff">
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
            <el-button type="success" @click="invitation_code" v-if="userlevel"
              >邀请码</el-button
            >
            <el-button type="success" @click="gotoAddHomework" v-if="userlevel"
              >创建作业</el-button
            >
            <el-button type="primary" @click="goto_Student_List" v-if="userlevel"
              >学生列表</el-button
            >
            <el-table :data="homeworkfrom" border style="width: 100%" @row-click="goto_Student_Homework">
              <!-- <el-table-column type="index" width="50"> </el-table-column> -->
              <el-table-column
                prop="title"
                label="作业名"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="end_time"
                label="结束时间"
                width="200"
              ></el-table-column>
              <el-table-column label="操作" width="150" v-if="userlevel">
                <template slot-scope="scope">
                  <!-- 修改按钮 -->
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click.native.stop="reviseHomework(scope.row.id)"
                  ></el-button>
                  <!-- 删除按钮 -->
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click.native.stop="del_Homework(scope.row.id)"
                  ></el-button>
                </template>
              </el-table-column>
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
      homeworkfrom: [],
      del_Homework_from: {
        homework_id: "",
        class_id: ""
      },
      // 用户等级
      userlevel: false,
      // 页面加载
      loading: true,
    };
  },
  created() {
    this.getuserlevel();
  },
  methods: {
    // 获取班级信息
    async getClassList() {
      const { data: res } = await this.$http.get(
        `class/myclass?class_id=${this.$route.query.id}`
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.classfrom = res.data;
      this.getHomeworkList();
    },
    // 获取班级作业信息
    async getHomeworkList() {
      const { data: res } = await this.$http.get(
        `class/myclass/list_homework?class_id=${this.$route.query.id}`
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.homeworkfrom = res.data;
      this.loading = false
    },
    // 生成邀请码
    async invitation_code() {
      const { data: res } = await this.$http.get(
        `class/myclass/generate_invite_code?class_id=${this.$route.query.id}`
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.$notify({
        title: "邀请码",
        message: res.data,
        duration: 0,
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
    // 修改作业
    reviseHomework(id) {
      this.$router.push({ path: "/revisehomework", query: { homework_id: id, class_id: this.$route.query.id } });
    },
    // 根据作业Id删除对应的作业
    async del_Homework(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该作业, 是否继续?",
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
      this.del_Homework_from.class_id = this.$route.query.id;
      this.del_Homework_from.homework_id = id;
      const { data: res } = await this.$http.post(
        "homework/del",
        this.del_Homework_from
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success("删除成功");
      this.getHomeworkList();
    },
    // 进入作业列表
    goto_Student_Homework(row) {
      this.$router.push({
        path: "/studenthomework",
        query: { id: row.id },
      });
    },
    // 用户等级
    getuserlevel() {
      if (window.localStorage.getItem("access")<=2) this.userlevel = true;
      this.getClassList();
    },
  },
};
</script>
<style scoped>
.box {
  width: 80%;
  margin: 20px auto;
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