<template>
  <div class="discusscontent_box">
    <!-- 按钮区域Start -->
    <div class="left-button">
      <el-button icon="el-icon-thumb" circle></el-button>
      <el-button
        icon="el-icon-chat-dot-square"
        circle
        @click="findFooter"
      ></el-button>
      <el-button icon="el-icon-orange" circle></el-button>
    </div>
    <!-- 按钮区域end -->
    <div class="main-box">
      <div class="box-content">
        <h1>{{ discussfrom.title }}</h1>
        <mavon-editor
          class="md"
          v-model="discussfrom.content"
          :subfield="false"
          :defaultOpen="'preview'"
          :toolbarsFlag="false"
          :editable="false"
          :scrollStyle="true"
          :ishljs="true"
        />
      </div>
      <div class="box-discuss">
        <el-card>
          <div class="title-box">
            <h1>评论</h1>
          </div>
          <div
            class="dicuss-content"
            v-for="(item, index) in reviewfrom"
            :key="index"
          >
            <el-button type="info" icon="el-icon-user-solid" circle></el-button>
            <div class="head">
              <h4>{{ item.username }}</h4>
              <div class="right">
                <span>{{ item.create_time }}</span>
                <el-link :underline="false">举报</el-link>
                <el-link :underline="false">回复</el-link>
              </div>
            </div>
            <mavon-editor
              class="review-md"
              v-model="item.content"
              :subfield="false"
              :defaultOpen="'preview'"
              :toolbarsFlag="false"
              :editable="false"
              :scrollStyle="true"
              :boxShadow="false"
              :ishljs="true"
            />
          </div>
          <!-- 分页区域Start -->
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-size="queryInfo.pagesize"
            layout="total, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
          <!-- 分页区域end -->
        </el-card>
      </div>
      <!-- 添加评论区域Start -->
      <div class="box-footer" id="box-footer">
        <mavon-editor v-model="create_reviewfrom" />
        <el-button type="danger" @click="createReview()">发表评论</el-button>
      </div>
      <!-- 添加评论区域end -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 获取题目列表的参数对象
      queryInfo: {
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2,
      },
      // 总计多少条
      total: 0,
      discussfrom: [],
      reviewfrom: [
        {
          username: "admin",
          create_time: "2022-1-24 15:29",
          content: "123",
        },
        {
          username: "admin",
          create_time: "2022-1-24 15:29",
          content: "123",
        },
        {
          username: "admin",
          create_time: "2022-1-24 15:29",
          content: "123",
        },
        {
          username: "admin",
          create_time: "2022-1-24 15:29",
          content:"34235",
        },
      ],
      create_reviewfrom: "",
    };
  },
  created() {
    this.getDiscussion();
    this.getReview();
    this.getPageinfo();
  },
  methods: {
    // 获取帖子
    async getDiscussion() {
      const { data: res } = await this.$http.get("discussion/topic_detail", {
        params: { topic_id: this.$route.query.id },
      });
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.discussfrom = res.data;
    },
    // 获取评论
    async getReview() {
      const { data: res } = await this.$http.get("discussion/review_list", {
        params: {
          topic_id: this.$route.query.id,
          page_no: this.queryInfo.pagenum,
        },
      });
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.reviewfrom = res.data;
    },
    // 发布评论
    async createReview() {
      if (this.create_reviewfrom == "") {
        return this.$message.error("评论为空！");
      }
      const { data: res } = await this.$http.post("discussion/create_review", {
        topic_id: this.$route.query.id,
        content: this.create_reviewfrom,
      });
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success(res.meta.message);
      this.getReview();
    },
    // 题目个数以及每页题目数量
    async getPageinfo() {
      const { data: res } = await this.$http.get("discussion/review_count", {
        params: {
          topic_id: this.$route.query.id,
        },
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取题目列表失败！");
      }
      this.total = res.count;
      this.queryInfo.pagesize = res.show_per_page;
      this.getReview();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getReview();
    },
    // 滑动到评论页面
    findFooter() {
      document
        .getElementById("box-footer")
        .scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>
<style scoped>
.discusscontent_box {
  width: 80%;
  margin: 20px auto;
}
.md {
  width: 100%;
  min-height: auto;
}
.left-button {
  position: absolute;
  left: 6%;
  top: 200px;
  width: 1px;
}
.left-button .el-button {
  float: left;
  margin: 10px 0;
}
.box-content {
  margin-bottom: 30px;
}
.box-discuss .dicuss-content {
  position: relative;
  margin-bottom: 20px;
}
.box-discuss .dicuss-content .el-button {
  position: absolute;
  top: -3px;
}
.box-discuss .dicuss-content .head {
  height: 30px;
  line-height: 30px;
  margin-left: 50px;
}
.box-discuss .dicuss-content .head h4 {
  float: left;
  margin: 0;
  font-size: 12px;
  color: #9999a5;
}
.box-discuss .dicuss-content .head .right {
  float: right;
  color: #9999a5;
}
.box-discuss .dicuss-content .head span {
  font-size: 12px;
  color: #9999a5;
  margin-right: 10px;
}
.box-discuss .dicuss-content .head .el-link {
  color: #9999a5;
  margin-right: 10px;
}
.box-discuss .dicuss-content .head .el-link:hover {
  color: #0056c2;
}
.review-md {
  width: 95%;
  min-height: auto;
  margin-left: 50px;
}
.box-footer {
  margin-top: 20px;
}
</style>