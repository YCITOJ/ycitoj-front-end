<template>
  <div class="box">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="比赛名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="starttime"
        label="开始时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lasttime"
        label="结束时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述">
      </el-table-column>
    </el-table>
  </div>
</template>

 <script>
    export default {
      data() {
        return {
          tableData: [{
            name: '盐工程序设计大赛DVI1',
            starttime: '2021-10-9 4:00',
            lasttime: '2021-10-9 5:00',
            description: '开心就好！',
            fff:'1'
          },
          {
            name: '盐工程序设计大赛DVI2',
            starttime: '2021-10-9 4:00',
            lasttime: '2021-10-9 5:00',
            description: '开心就好！',
            fff:'2'
          },
          {
            name: '盐工程序设计大赛DVI2',
            starttime: '2021-10-9 4:00',
            lasttime: '2021-10-9 5:00',
            description: '开心就好！',
            fff:'3'
          }]
        }
      }
    }
  </script>
<style scoped>
.box {
  margin-top: 20px;
  margin-left: 10%;
  margin-right: 10%;
}
</style>