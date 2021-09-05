<template>
  <div class="boxhome">
    <div class="box1">
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
    <div class="box2" v-show="userlevel">
    <el-card>
      <el-button type="primary" class="button1" @click="revise()">修改</el-button>
      <el-button type="danger" class="button2" @click="removeProblemById()">删除</el-button>
    </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      // 用户等级
      userlevel: false,
      uploader: ""
    };
  },
  created() {
    this.get_problem_info();
  },
  methods: {
    async get_problem_info() {
      const { data: res } = await this.$http.get(
        `prob_collection/collection?id=${this.$route.query.id}`
      );
      if (res.meta.status === 400) {
        return this.$message.error(res.meta.message);
      }
      //console.log(res)
      this.value = res.data.info
      this.uploader = res.data.uploader
      await this.getuserlevel()
    },

    // 修改题单
    revise() {
      this.$router.push({ path: "/reviseproblemlist", query: { id:this.$route.query.id } });
    },

    // 根据Id删除对应的题目
    async removeProblemById() {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该题目, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      // console.log(this.form.num);
      const { data: res } = await this.$http.post("prob_collection/del",{id:this.$route.query.id});
      //console.log(res);
      if (res.meta.status != 200) {
        return this.$message.error("删除题目失败！");
      }
      this.$message.success("删除题目成功！");
      this.$router.go(-1);
    },

    // 获取用户等级
    getuserlevel() {
      if (window.localStorage.getItem("access") <= 1 || window.localStorage.getItem("userid") == this.uploader) this.userlevel = true;
    },
  },
};
</script>
<style scoped>
.boxhome {
    margin-top: 20px;
    background-color: red;
}
.box1 {
    float: left;
    width: 75%;
}
.box2 {
    float: right;
    width: 20%;
}
.box1 .button1 {
    width: 100%;
    float: right;
}
.box1 .button2 {
    margin: 20px 0;
    width: 100%;
    float: right;
}
</style>