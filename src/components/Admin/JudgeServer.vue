<template>
  <div id="judge-server-home">
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 添加区域 -->
      <el-button type="primary" @click="AdddialogVisible = true"
        >添加服务器</el-button
      >
      <!-- 服务器列表区域 -->
      <el-table :data="GetJudgeServer" stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-show="scope.row.connected == '1'"
              ><img src="../../assets/img/server1.png" alt="" /> 在线</span
            >
            <span v-show="scope.row.connected == '0'"
              ><img src="../../assets/img/server2.png" alt="" /> 断开</span
            >
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="地址" prop="host"></el-table-column>
        <el-table-column label="端口" prop="port"></el-table-column>
        <el-table-column label="任务数" prop="remain_tasks"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="remove_judge_server(scope.row.sid)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加服务器 -->
    <el-dialog title="服务器" :visible.sync="AdddialogVisible" width="30%">
      <el-form label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="AddJudgeServer.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="AddJudgeServer.host"></el-input>
        </el-form-item>
        <el-form-item label="端口">
          <el-input v-model="AddJudgeServer.port"></el-input>
        </el-form-item>
        <el-form-item label="安全密钥">
          <el-input v-model="AddJudgeServer.secure_token"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add_judge_server">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      GetJudgeServer: [],
      AddJudgeServer: {
        name: "",
        host: "",
        port: "",
        secure_token: "",
      },
      //添加服务器对话框
      AdddialogVisible: false,
    };
  },
  created() {
    this.get_judge_server();
  },
  methods: {
    //获取服务器
    async get_judge_server() {
      const { data: res } = await this.$http.get("judge_server/list");
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.GetJudgeServer = res.data;
    },
    //添加服务器
    async add_judge_server() {
      const { data: res } = await this.$http.post(
        "judge_server/add_server",
        this.AddJudgeServer
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.AdddialogVisible = false;
      this.get_judge_server();
      this.$message.success(res.meta.message);
    },
    //删除服务器
    async remove_judge_server(row) {
      // 弹框询问用户是否删除服务器
      const confirmResult = await this.$confirm(
        "此操作将永久删除该服务器, 是否继续?",
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
      const { data: res } = await this.$http.post(
        "judge_server/remove_server",
        { sid: row }
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.get_judge_server();
      this.$message.success(res.meta.message);
    },
  },
};
</script>
<style scoped>
#judge-server-home {
  margin: 20px;
}
img {
  position: relative;
  width: 16px;
  top: 3px;
}
</style>