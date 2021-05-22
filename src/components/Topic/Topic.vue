<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible">添加题目</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="problemslist" stripe>
        <el-table-column label="提交状态" width="100vh"></el-table-column>
        <el-table-column label="编号" prop="num" width="100vh"></el-table-column>
        <el-table-column label="题目" prop="title"></el-table-column>
        <el-table-column label="难度" prop="difficulty" width="100vh"></el-table-column >
        <el-table-column label="通过" prop="email" width="100vh"></el-table-column >
        <el-table-column label="提交" prop="mobile" width="100vh"></el-table-column>
        <el-table-column label="通过率" prop="role_name" width="100vh"></el-table-column>
        <el-table-column label="状态" width="100vh">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-size="queryInfo.pagesize" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      problemslist: [],
      total: 0,
    }
  },
  created() {
    this.getUserList()
    this.getPageinfo()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('problems/list?page_no=' + this.queryInfo.pagenum)
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.problemslist = res.data
    },
    // 题目个数以及每页题目数量
    async getPageinfo() {
      const { data: res } = await this.$http.get('problems/page_info')
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.total = res.count
      this.queryInfo.pagesize = res.show_per_page
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    /* // 监听 switch 开关状态的改变
    async userStateChanged(userinfo) {
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
    // 根据Id删除对应的用户信息
    async removeUserById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      const { data: res } = await this.$http.delete('users/' + id)

      if (res.meta.status !== 200) {
        return this.$message.error('删除用户失败！')
      }

      this.$message.success('删除用户成功！')
      this.getUserList()
    },

    // 跳转到添加题目
    addDialogVisible() {
      this.$router.push('/Addproblems')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
