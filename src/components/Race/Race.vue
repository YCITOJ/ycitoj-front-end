<template>
  <div class="box">
    <el-table :data="tableData" style="width: 100%" @row-click="gotoracehome">
      <el-table-column prop="name" label="比赛名称" width="300">
        <template slot-scope="scope">
          {{scope.row.name}}
          <el-button type="primary" size="mini" v-show="scope.row.fff == 1">报名</el-button>
          <el-button type="success" size="mini" v-if="scope.row.fff == 2">进行中</el-button>
          <el-button type="info" size="mini" v-if="scope.row.fff == 3">结束</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="starttime" label="开始时间" width="180">
      </el-table-column>
      <el-table-column prop="lasttime" label="结束时间" width="180">
      </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 6,
      },
      total: 50,
      tableData: [
        {
          name: "盐工程序设计大赛DVI1",
          starttime: "2021-10-9 4:00",
          lasttime: "2021-10-9 5:00",
          description: "开心就好！",
          fff: "1",
        },
        {
          name: "盐工程序设计大赛DVI2",
          starttime: "2021-10-9 4:00",
          lasttime: "2021-10-9 5:00",
          description: "开心就好！",
          fff: "2",
        },
        {
          name: "盐工程序设计大赛DVI2",
          starttime: "2021-10-9 4:00",
          lasttime: "2021-10-9 5:00",
          description: "开心就好！",
          fff: "3",
        },
        {
          name: "盐工程序设计大赛DVI2",
          starttime: "2021-10-9 4:00",
          lasttime: "2021-10-9 5:00",
          description: "开心就好！",
          fff: "3",
        },
        {
          name: "盐工程序设计大赛DVI2",
          starttime: "2021-10-9 4:00",
          lasttime: "2021-10-9 5:00",
          description: "开心就好！",
          fff: "3",
        },
        {
          name: "盐工程序设计大赛DVI2",
          starttime: "2021-10-9 4:00",
          lasttime: "2021-10-9 5:00",
          description: "开心就好！",
          fff: "3",
        },
        {
          name: "盐工程序设计大赛DVI2",
          starttime: "2021-10-9 4:00",
          lasttime: "2021-10-9 5:00",
          description: "开心就好！",
          fff: "3",
        },
      ],
    };
  },
  methods: {
    gotoracehome() {
      this.$router.push({ path: "/racehome" });
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      //this.queryInfo.pagesize = newSize;
      //this.getUserList();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage);
      //this.queryInfo.pagenum = newPage;
      //this.getUserList();
    },
  },
};
</script>
<style scoped>
.box {
  margin-top: 20px;
  margin-left: 10%;
  margin-right: 10%;
}
</style>
