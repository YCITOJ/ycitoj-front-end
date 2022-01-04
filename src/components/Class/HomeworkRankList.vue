<template>
  <div
    class="box"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="#ffffff"
  >
    <el-header></el-header>
    <el-main>
      <button @click="exportExcel">点击导出</button>
      <el-table :data="rank_list" center id="out-table">
        <el-table-column fixed type="index" label="序号"></el-table-column>
        <el-table-column
          fixed
          prop="class"
          label="班级"
          align="center"
          sortable
        >
        </el-table-column>
        <el-table-column fixed prop="name" label="姓名" align="center" sortable>
        </el-table-column>
        <el-table-column fixed prop="sno" label="学号" align="center" sortable>
        </el-table-column>
        <el-table-column
          fixed
          prop="score"
          label="得分"
          align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          v-for="(item, index) in headerlist"
          :key="index"
          :label="item.num"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <p
              class="submit_frequency"
              style="margin: 0; color: #67c23a"
              v-if="scope.row.prob_list[index].ac == true"
            >
              +
            </p>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>
<script>
// 引入导出Excel表格依赖
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  data() {
    return {
      rank_list: [],
      headerlist: [],
      time: "",
      // 页面加载
      loading: true,
    };
  },
  created() {
    this.get_homework_rank_list();
  },
  methods: {
    async get_homework_rank_list() {
      const { data: res } = await this.$http.get(
        `homework/calc_rank_list?id=${this.$route.query.id}`
      );
      if (res.meta.status !== 200) {
        return this.$message.error("获取题目列表失败！");
      }
      this.rank_list = res.rank_list;
      if (res.rank_list.length != 0)
        this.headerlist = res.rank_list[0].prob_list;
      this.loading = false;
    },

    //定义导出Excel表格事件
    exportExcel() {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "作业成绩表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
  },
};
</script>
<style scoped>
.box {
  position: absolute;
  width: 80%;
  top: 40px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
<style scoped>
</style>