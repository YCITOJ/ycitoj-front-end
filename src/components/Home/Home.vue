<template>
  <div class="main_box">
    <div class="card1">
      <div class="card1-1 border_style">
        <div class="border_style_header">
          <h4>{{announcement.title}}</h4>
        </div>
        <div class="card1-1_main_left" v-show="userlevel">
            <el-button icon="el-icon-plus" circle @click="create_announcement"></el-button>
            <el-button type="primary" icon="el-icon-edit" circle @click="update_announcement"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="del_announcement"></el-button>
        </div>
        <!-- 公告内容 -->
        <div class="main">
          <mavon-editor
            class="md"
            v-model="announcement_value"
            :subfield="false"
            :defaultOpen="'preview'"
            :toolbarsFlag="false"
            :editable="false"
            :scrollStyle="true"
            :ishljs="true"
            :boxShadow="false"
            previewBackground="#ffffff"
            boxShadowStyle="0 0 0 0"
          />
        </div>
      </div>
      <div class="card1-2 border_style">
        <div class="border_style_header">
          <h4>友情链接</h4>
          <div class="box">
            <a href="https://codeforces.com/">
              <div class="img">
                <img src="../../assets/img/codeforces.png" />
              </div>
            </a>
            <p>CF</p>
          </div>
          <div class="box">
            <a href="https://www.luogu.com.cn/">
              <div class="img">
                <img src="../../assets/img/logosingle.png" />
              </div>
            </a>
            <p>洛谷</p>
          </div>
        </div>
        <div class="main"></div>
      </div>
    </div>
    <div class="card2">
      <div class="card2-1 border_style">
        <el-calendar v-model="calendar">
        </el-calendar>
      </div>
      <div class="card2-2 border_style">
        <div class="border_style_header">
          <h4>近期公告</h4>
        </div>
        <!-- 近期公告内容 -->
        <div class="main">
          <el-table :data="announcement_list" style="width: 100%" height="620" @row-click="click_item">
            <el-table-column prop="title" label="名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="create_time" label="时间" show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      announcement_value: "",
      announcement_list: [],
      announcement: "",
      userlevel: false,
      calendar: new Date()
    };
  },
  created() {
    this.getuserlevel()
  },
  methods: {
    // 获取公告列表
    async get_announcement_list() {
      const { data: res } = await this.$http.get("announcement/list", {params:{ page_no:1 }});
      if (res.meta.status === 400) {
        return this.$message.error(res.meta.message);
      }
      this.announcement_list = res.data
      this.announcement = res.data[0]
      this.announcement_value = res.data[0].info
      this.loading = false
    },
    // 进入创建公告界面
    create_announcement() {
      this.$router.push("/createannouncement")
    },
    // 进入修改修改页面
    update_announcement() {
      this.$router.push({name:"updateannouncement", params: {data: this.announcement}})
    },
    // 删除公告
    async del_announcement() {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该公告, 是否继续?",
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
      const { data: res } = await this.$http.post("/announcement/del",{id:this.announcement.id});
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success(res.meta.message);
      this.get_announcement_list()
    },
    // 进入以前公告
    click_item(row) {
      this.announcement = row
      this.announcement_value = row.info
    },
    // 获取用户等级
    getuserlevel() {
      if (window.localStorage.getItem("access") === "0") this.userlevel = true;
      this.get_announcement_list()
    },
  }
};
</script>

<style scoped>
.main_box {
  width: 80%;
  margin: 20px auto;
}
.card1 {
  float: left;
  margin-left: 10%;
  width: 51%;
}
.card2 {
  float: right;
  margin-right: 8%;
  width: 30%;
}
/* 边框样式 */
.border_style {
  border: 1px solid #d4d4d5;
  border-radius: 6px;
}
.border_style_header {
  border-bottom: 1px solid #d5d4d4;
  height: 50px;
}
h4 {
  margin: 0;
  padding-left: 3%;
  line-height: 50px;
}

.card1-1_main_left {
  width: 40px;
  float: left;
  margin-left: -60px;
}
.card1-1_main_left .el-button {
  float: right;
  margin-top: 15px;
}
.card1-2 {
  margin-top: 20px;
  height: 300px;
}
.card2-1 {
  height: 700px;
  margin-bottom: 20px;
}
.card2-3 {
  margin-top: 20px;
  height: 400px;
}

.box {
  float: left;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  align-content: center;
  width: 100px;
  height: 140px;
  margin: 35px;
}

.box .img {
  width: 100px;
  height: 100px;
  box-shadow: 18px 18px 30px rgba(0, 0, 0, 0.1),
    -18px -18px 30px rgba(255, 255, 255, 1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #efeeee;
  transition: box-shadow 0.2s ease-out;
  position: relative;
}

.box .img img {
  width: 60px;
  transition: width 0.2s ease-out;
}

.box p {
  color: slategrey;
}

.box .img:hover {
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2),
    0px 0px 0px rgba(255, 255, 255, 0.8),
    inset 18px 18px 30px rgba(0, 0, 0, 0.1),
    inset -18px -18px 30px rgba(255, 255, 255, 1);
  transition: box-shadow 0.2s ease-out;
}

.box .img:hover img {
  width: 58px;
  transition: width 0.2s ease-out;
}
</style>
