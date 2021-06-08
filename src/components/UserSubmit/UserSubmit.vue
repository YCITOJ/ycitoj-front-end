<template>
  <el-container class="page">
    <el-header>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="题目:">
          <el-input v-model="formInline.problem"></el-input>
        </el-form-item>
        <el-form-item label="提交者:">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="语言:">
          <el-select v-model="formInline.region">
            <el-option label="CPP" value="shanghai"></el-option>
            <el-option label="JAVA" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="formInline.state">
            <el-option label="wo" value="shanghai"></el-option>
            <el-option label="ac" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
        <el-card>
         <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="编号"
        width="100vh">
      </el-table-column>
      <el-table-column
        label="题目">
      </el-table-column>
      <el-table-column
        label="状态">
      </el-table-column>
      <el-table-column
        label="分数"
        width="100vh">
      </el-table-column>
      <el-table-column
        label="总时间"
        width="100vh">
      </el-table-column>
      <el-table-column
        label="内存"
        width="100vh">
      </el-table-column>
      <el-table-column
        label="提交者"
        width="100vh">
      </el-table-column>
      <el-table-column
        label="提交时间"
        width="100vh">
      </el-table-column>
    </el-table>
     <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-size="queryInfo.pagesize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    </el-main>
  </el-container>
</template>
<script>
export default {
    data() {
      return {
        formInline: {
          problem: '',
          user: '',
          region: '',
          state: ''
        },
    // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2,
      },
      }
    },
    methods: {
      onSubmit() {
        console.log(this.region)
        console.log('submit!');
      }
    }
};
</script>
<style scoped>
.page {
    padding-top: 20px;
    padding-left: 10%;
    padding-right: 10%;
}
</style>
