<template>
  <div class="topicbox">
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入题目编号或内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getproblemList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible"  v-if="userlevel==1">添加题目</el-button>
        </el-col>
      </el-row>
      <!-- 题目列表区域 --><!-- @row-dblclick="gotosubmit" -->
      <el-table :data="problemslist" stripe class="problemlist" @row-click="gotosubmit">
        <el-table-column label="提交状态" width="100"></el-table-column>
        <el-table-column
          label="编号"
          prop="num"
          width="100"
        ></el-table-column>
        <el-table-column label="题目" prop="title"></el-table-column>
        <el-table-column
          label="难度"
          prop="difficulty"
          width="50"
        ></el-table-column>
        <el-table-column
          label="通过"
          prop="email"
          width="50"
        ></el-table-column>
        <el-table-column
          label="提交"
          prop="mobile"
          width="50"
        ></el-table-column>
        <el-table-column
          label="通过率"
          prop="role_name"
          width="70"
        ></el-table-column>
        <el-table-column label="状态" width="100" v-if="userlevel==1">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="400" v-if="userlevel==1">
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
              @click.native.stop="removeUserById(scope.row.num)"
            ></el-button>
            <!-- 上传按钮 -->
            <el-button type="primary" size="mini" @click.native.stop="upload(scope.row.num)"
              >上传<i class="el-icon-upload el-icon--right"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-size="queryInfo.pagesize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    <el-dialog title="上传文件" :visible.sync="dialogVisible" width="30%">
      <input type="file" @change="getFile($event)">
      <button @click="uploadsubmit($event)">提交</button>
    </el-dialog>
  </div>
</template>

<script>
import '../Topic/style.js'
export default {
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2,
      },
      problemslist: [],
      total: 0,
      form: {
        num: "",
      },
      // 控制上传文件对话框的关闭
      dialogVisible: false,
      // 上传附加数据
      uploadfile: '',
      uploadnum: '',
      // 用户等级
      userlevel: '0'
    }
  },
  created() {
    this.getUserList();
    this.getPageinfo();
    this.getuserlevel();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get(
        "problems/list?page_no=" + this.queryInfo.pagenum
      );
      if (res.meta.status !== 200) {
        return this.$message.error("获取用户列表失败！");
      }
      this.problemslist = res.data;
      // console.log(res)
    },
    // 题目个数以及每页题目数量
    async getPageinfo() {
      const { data: res } = await this.$http.get("problems/page_info");
      if (res.meta.status !== 200) {
        return this.$message.error("获取用户列表失败！");
      }
      this.total = res.count;
      this.queryInfo.pagesize = res.show_per_page;
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    // 获取用户等级
    getuserlevel() {
      if(window.localStorage.getItem("token"))
        this.userlevel=1;
    },
    // 搜索题目
    async getproblemList() {
      console.log(this.queryInfo.query)
      const { data: res } = await this.$http.get('problems/find_problems/?title_or_num='+this.queryInfo.query)
      console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error("搜索题目失败！");
      }
      this.problemslist = res.data
    },
    // 进入题目
    gotosubmit(row) {
       //console.log(1)
     this.$router.push({path: '/submit', query: {id: row.num}});
    },
    
    // 监听 switch 开关状态的改变
    /* async userStateChanged(userinfo) {
      console.log(userinfo)
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
      this.$router.push({path: '/revise', query: {id: num}})
    },
    // 根据Id删除对应的题目
    async removeUserById(id) {
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
      this.form.num = id;
      // console.log(this.form.num);
      const { data: res } = await this.$http.post(
        "problems/del_problem",
        this.form
      );
      // console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error("删除题目失败！");
      }
      this.$message.success("删除题目成功！");
      this.getUserList();
      this.getPageinfo();
    },
    // 上传文件
    getFile(event) {
      this.uploadfile = event.target.files[0];
      //console.log(this.uploadfile);
    },
  async uploadsubmit(event) {
      event.preventDefault(); //取消默认行为
      //创建 formData 对象
      var formData = new FormData();
      // 向 formData 对象中添加文件
      formData.set('num',this.uploadnum)
      formData.append('file',this.uploadfile);
      //console.log(formData)
      const { data: res } = await this.$http.post('problems/upload_cases', formData);
      //console.log(res)
    },
    upload(id) {
      this.uploadnum = id
      this.dialogVisible = true
    },

    // 跳转到添加题目
    addDialogVisible() {
      this.$router.push("/Addproblems");
    },
  },
};
</script>

<style scoped>
.topicbox{
  width: 80%;
  margin-top: 40px;
  margin-left: 160px;
}
.problemlist {
  margin-top: 40px;
}
</style>
