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
    <div class="box2">
    <el-card>
      <el-button type="success" class="button" @click="add_to_favorite()" v-show="!CheckFavorite">收藏</el-button>
      <el-button type="danger" class="button" @click="remove_favorite()" v-show="CheckFavorite">取消收藏</el-button>
      <el-button type="primary" class="button" @click="revise()" v-show="userlevel">修改</el-button>
      <el-button type="danger" class="button" @click="removeProblemById()" v-show="userlevel">删除</el-button>
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
      uploader: "",
      CheckFavorite: false
    };
  },
  created() {
    this.get_problem_info();
    this.check_favorite();
  },
  methods: {
    async get_problem_info() {
      const { data: res } = await this.$http.get(
        `prob_collection/collection?id=${this.$route.query.id}`
      );
      if (res.meta.status === 400) {
        return this.$message.error(res.meta.message);
      }
      this.value = res.data.info
      this.uploader = res.data.uploader
      await this.getuserlevel()
    },
    // 收藏
    async add_to_favorite() {
      const { data:res } =await this.$http.post('prob_collection/add_to_favorite',{id:this.$route.query.id});
      if (res.meta.status === 400) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success(res.meta.message)
      this.check_favorite();  
    },
    //取消收藏
    async remove_favorite() {
      const { data:res } =await this.$http.post('prob_collection/remove_favorite',{id:this.$route.query.id});
      if (res.meta.status === 400) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success(res.meta.message)
      this.check_favorite();  
    },
     // 检测是否收藏
   async check_favorite() {
     const { data:res } =await this.$http.get( `prob_collection/check_favorite?id=${this.$route.query.id}`);
     if (res.meta.status === 400) {
        return this.$message.error(res.meta.message);
      }
      this.CheckFavorite = res.data;
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
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      const { data: res } = await this.$http.post("prob_collection/del",{id:this.$route.query.id});
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
.box2 .button {
    width: 80%;
    margin-bottom: 20px;
    margin-left: 10%;
}
</style>