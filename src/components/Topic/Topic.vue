<template>
  <div
    class="topicbox"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="#ffffff"
  >
    <!-- 搜索与添加区域 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          placeholder="请输入题目编号或名称"
          v-model="queryInfo.query"
          clearable
          @clear="getPageinfo"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getSearch"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="1">
        <el-button
          icon="el-icon-price-tag"
          circle
          @click="openTagBox()"
        ></el-button>
      </el-col>
      <el-col :span="4">
        <el-button
          icon="el-icon-plus"
          @click="addDialogVisible"
          v-if="userlevel == 1"
          circle
        ></el-button>
      </el-col>
    </el-row>
    <!-- 标签区域Start -->
    <div class="tag_box" v-if="tag_box_show">
      <ul>
        <li v-for="(item, index) of tag_box" :key="index">
          <el-button
            size="mini"
            round
            :style="{ '--backgroundcolor': item.color }"
            class="tag_button"
            @click="getProblemsByTag(item.id)"
            >{{ item.name }}</el-button
          >
        </li>
      </ul>
    </div>
    <!-- 标签区域End -->
    <!-- 题目列表区域 -->
    <el-table
      :data="problemslist"
      stripe
      class="problemlist"
      @row-click="gotosubmit"
    >
      <el-table-column label="提交状态" prop="ac" width="100" align="center">
        <template slot-scope="scope">
          <i class="el-icon-check" v-if="scope.row.ac"></i>
        </template>
      </el-table-column>
      <el-table-column label="编号" prop="num" width="100"></el-table-column>
      <el-table-column label="题目" prop="title" :show-overflow-tooltip="true">
        <!-- 题目是否公开颜色判定 -->
        <template slot-scope="scope">
          <el-link v-show="scope.row.is_public == 1">{{
            scope.row.title
          }}</el-link>
          <el-link type="danger" v-show="scope.row.is_public !== 1">{{
            scope.row.title
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="难度" width="100">
        <template slot-scope="scope">
          <!-- v-bind:color="difficulty_color_form[scope.row.difficulty]" -->
          <el-tag
            :type="difficulty_form[scope.row.difficulty].type"
            effect="plain"
          >
            {{ difficulty_form[scope.row.difficulty].label }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="通过率" width="120" align="center">
        <template slot-scope="scope" align="center">
          <el-tooltip
            class="item"
            effect="dark"
            content="scope.row.subm_cnt"
            placement="top"
          >
            <div slot="content">
              <span>{{ scope.row.subm_cnt }}</span>
            </div>
            <el-progress
              :percentage="scope.row.ac_cnt"
              :show-text="false"
            ></el-progress>
          </el-tooltip>
        </template>
      </el-table-column>
      <!-- <el-table-column label="提交" prop="subm_cnt" width="70" align="center"></el-table-column> -->
      <!-- <el-table-column label="通过率" v-model="AC_pr" width="70" align="center"></el-table-column> -->
      <!-- <el-table-column label="状态" width="100" v-if="userlevel == 1">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_public"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="210" v-if="userlevel == 1">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click.native.stop="showEditDialog(scope.row.num)"
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click.native.stop="removeProblemById(scope.row.num)"
          ></el-button>
          <!-- 上传按钮 -->
          <el-button
            type="primary"
            size="mini"
            @click.native.stop="upload(scope.row.num)"
            >上传<i class="el-icon-upload el-icon--right"></i
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-size="queryInfo.pagesize"
      layout="total, prev, pager, next, jumper"
      :total="total"
      v-show="queryInfoFlag == true"
    >
    </el-pagination>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="queryInfoTag.pagenum"
      :page-size="queryInfoTag.pagesize"
      layout="prev,next, jumper"
      v-show="queryInfoFlag == false"
    >
    </el-pagination>
    <!-- 分页区域end -->
    <el-dialog title="上传文件" :visible.sync="dialogVisible" width="30%">
      <p>压缩包不要包含文件夹</p>
      <input type="file" @change="getFile($event)" class="up_things" />
      <el-button @click="uploadsubmit($event)">提交</el-button>
      <template>
        <el-table :data="file_form" style="width: 100%">
          <el-table-column prop="point" label="样例点"> </el-table-column>
        </el-table>
      </template>
    </el-dialog>
    <!-- 回到顶部插件 -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import "../Topic/style.js";
export default {
  data() {
    return {
      // 获取题目列表的参数对象
      queryInfo: {
        // 搜索区域
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2,
      },
      total: 0,
      // 获取标签列表的参数对象
      queryInfoTag: {
        // 搜索区域
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2,
      },
      // 当前页面页码 true题目页面 false 标签页面
      queryInfoFlag: true,
      problemslist: [],
      
      form: {
        num: "",
      },
      // 控制上传文件对话框的关闭
      dialogVisible: false,
      // 上传附加数据
      uploadfile: "",
      uploadnum: "",
      // 获取样例点
      file_form: [],
      // 用户等级
      userlevel: "0",
      // 难度等级
      difficulty_form: [
        {},
        { type: "", label: "入门" },
        { type: "success", label: "简单" },
        { type: "info", label: "中等" },
        { type: "warning", label: "较难" },
        { type: "danger", label: "困难" },
      ],
      loading: true,
      //控制标签区域是否显示
      tag_box_show: false,
      tag_box: {},
      tagcolor: "red",
      //当前点击的标签
      nowtag: "",
    };
  },
  created() {
    this.getuserlevel();
  },
  methods: {
    async getProblemList() {
      this.queryInfo.pagenum = Number(
        window.sessionStorage.getItem("topicPage")
      );
      console.log(this.queryInfo.pagenum)
      if (this.queryInfo.pagenum == null || this.queryInfo.pagenum == 0)
        this.queryInfo.pagenum = 1;
      const { data: res } = await this.$http.get(
        "problems/list?page_no=" + this.queryInfo.pagenum
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      //console.log(res)
      this.problemslist = res.data;
      for (var i = 0; i < res.data.length; i++) {
        var data1, data2;
        data1 = res.data[i].ac_cnt;
        data2 = res.data[i].subm_cnt;
        this.problemslist[i].ac_cnt =
          data1 <= 0 ? 0 : Math.round((data1 / data2) * 10000) / 100.0;
        this.problemslist[i].subm_cnt = data1 + "/" + data2;
      }
      this.loading = false;
    },
    // 题目个数以及每页题目数量
    async getPageinfo() {
      const { data: res } = await this.$http.get("problems/page_info");
      if (res.meta.status !== 200) {
        return this.$message.error("获取题目列表失败！");
      }
      this.total = res.count;
      this.queryInfo.pagesize = res.show_per_page;
      this.getProblemList();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      if (this.queryInfoFlag == true) {
        window.sessionStorage.setItem("topicPage", newPage);
        this.getProblemList();
      } else {
        this.queryInfoTag.pagenum = newPage;
        this.getProblemsByPagenum(this.nowtag);
      }
    },
    // 获取用户等级
    getuserlevel() {
      if (window.localStorage.getItem("access") == "0") this.userlevel = 1;
      this.getPageinfo();
      this.getTagList();
    },
    // 搜索题目
    async getSearch() {
      if (this.queryInfo.query == "") {
        return;
      }
      const { data: res } = await this.$http.get(
        "problems/find_problems/?title_or_num=" + this.queryInfo.query
      );
      if (res.meta.status !== 200) {
        return this.$message.error("搜索题目失败！");
      }

      this.problemslist = res.data;
      for (var i = 0; i < res.data.length; i++) {
        var data1, data2;
        data1 = res.data[i].ac_cnt;
        data2 = res.data[i].subm_cnt;
        this.problemslist[i].ac_cnt =
          data1 <= 0 ? 0 : Math.round((data1 / data2) * 10000) / 100.0;
        this.problemslist[i].subm_cnt = data1 + "/" + data2;
      }
      this.total = this.problemslist.length;
    },
    // 获取标签
    async getTagList() {
      const { data: res } = await this.$http.get("tag/tag_list?page_no=1");
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.tag_box = res.data;
    },
    // 获取标签题目
    async getProblemsByTag(id) {
      this.queryInfoTag.pagenum = 1;
      this.nowtag = id;
      const { data: res } = await this.$http.get(
        `tag/problems_by_tag?page_no=${this.queryInfoTag.pagenum}&tag_id=${id}`
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.queryInfoFlag = false;
      this.problemslist = res.data;
    },
    async getProblemsByPagenum(id) {
      const { data: res } = await this.$http.get(
        `tag/problems_by_tag?page_no=${this.queryInfoTag.pagenum}&tag_id=${id}`
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.queryInfoFlag = false;
      this.problemslist = res.data;
    },
    // 打开标签盒子
    openTagBox() {
      if (this.tag_box_show == true) {
        this.queryInfoFlag = true;
      }
      this.tag_box_show = !this.tag_box_show;
      this.getProblemList();
    },
    // 进入移动端或pc端
    gotosubmit(row) {
      this.$router.push({
        path: "/submit",
        query: { id: row.num, where: "topic" },
      });
    },

    // 监听 switch 开关状态的改变
    /* async userStateChanged(userinfo) {
      const { data: res } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      )
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error('更新用户状态失败！')
      }
      this.$message.success('更新用户状态成功！')
    }, */
    // 修改题目
    showEditDialog(num) {
      this.$router.push({ path: "/revise", query: { id: num } });
    },
    // 根据Id删除对应的题目
    async removeProblemById(id) {
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
      this.form.num = id;
      const { data: res } = await this.$http.post(
        "problems/del_problem",
        this.form
      );
      if (res.meta.status !== 200) {
        return this.$message.error("删除题目失败！");
      }
      this.$message.success("删除题目成功！");
      this.getProblemList();
      this.getPageinfo();
    },
    // 上传文件
    getFile(event) {
      this.uploadfile = event.target.files[0];
    },
    async uploadsubmit(event) {
      event.preventDefault(); //取消默认行为
      //创建 formData 对象
      var formData = new FormData();
      // 向 formData 对象中添加文件
      formData.set("num", this.uploadnum);
      formData.append("file", this.uploadfile);
      const { data: res } = await this.$http.post(
        "problems/upload_cases",
        formData
      );
      if (res.meta.status !== 200) {
        return this.$message.error("上传失败！");
      }
      this.$message.success("上传成功！");
      this.get_file_form();
    },
    upload(id) {
      this.uploadnum = id;
      this.dialogVisible = true;
      this.file_form = [];
      this.get_file_form();
    },

    // 获取样例点
    async get_file_form() {
      const { data: res } = await this.$http.get(
        `problems/cases_list?num=${this.uploadnum}`
      );
      this.file_form = res.data.map((str) => {
        return { point: str };
      });
    },

    // 跳转到添加题目
    addDialogVisible() {
      this.$router.push("/Addproblems");
    },
  },
};
</script>

<style scoped>
.topicbox {
  position: absolute;
  width: 80%;
  top: 80px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.problemlist {
  margin-top: 20px;
}
.up_things {
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
/* 标签区域 */
.tag_box {
  width: 100%;
  margin-top: 10px;
}
.tag_box ul li {
  float: left;
  list-style: none;
  margin-left: 10px;
}
.tag_button {
  background-color: var(--backgroundcolor);
  color: #fff;
  font-weight: 700;
  font-size: 14px;
}
</style>
