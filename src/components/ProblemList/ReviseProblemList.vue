<template>
  <div class="box"
  v-loading="loading"
   element-loading-text="拼命加载中"
   element-loading-spinner="el-icon-loading"
   element-loading-background="#ffffff">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="题单名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="添加题目">
        <el-input placeholder="请输入题目编号" v-model="problemid" clearable>
          <el-button
            slot="append"
            icon="el-icon-download"
            @click="addProblemId"
          ></el-button>
        </el-input>
        <el-table :data="problemlist" style="width: 80%" row-key="id">
          <el-table-column prop="num" label="题目编号"> </el-table-column>
          <el-table-column prop="title" label="题目名称"> </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <!-- 删除按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click.native.stop="deleteproblem(scope.$index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="题单说明">
        <mavon-editor v-model="form.info" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="putRace">立即修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
export default {
  data() {
    return {
      form: {
        title: "",
        prob_set: "",
        info: "",
        id: ''
      },
      // 添加比赛题目编号
      problemid: "",
      problemlist: [],
      // 页面加载
      loading: true,
    };
  },
  created() {
      this.get_problem_info()
  },
  mounted() {
    this.rowDrop()
  },
  methods: {
    async get_problem_info() {
      const { data: res } = await this.$http.get(
        `prob_collection/collection?id=${this.$route.query.id}`
      );
      if (res.meta.status === 400) {
        return this.$message.error(res.meta.message);
      }
      this.form.title = res.data.title
      this.problemlist = res.data.prob_set
      this.form.info = res.data.info

      this.loading = false
    },
    // 提交题单
    async putRace() {
      // 题目数量判断
      if (this.problemlist.length <= 0) {
        return this.$message.error("请添加题目！");
      } else if(this.problemlist.length >50) {
        return this.$message.error("添加题目不能多于50题！");
      }
      this.form.id = this.$route.query.id
      // 提交题目数组修改为 p001|p002|
      this.form.prob_set = `${this.problemlist[0].num}`;
      for (var i = 1; i < this.problemlist.length; i++) {
        this.form.prob_set = `${this.form.prob_set}|${this.problemlist[i].num}`;
      }
      const { data: res } = await this.$http.post(
        "prob_collection/update",
        this.form
      );
      if (res.meta.status === 400) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success(res.meta.message);
      this.$router.go(-1);
    },
    async addProblemId() {
      const { data: res } = await this.$http.get(
        `problems/prob_exists?num=${this.problemid}`
      );
      if (res.meta.status === 400) {
        return this.$message.error("题目编号不存在！");
      }
      let newlist = {
        num: "",
        title: ''
      };
      newlist.num = this.problemid
      newlist.title = res.title
      this.problemlist.push(newlist)
    },
    // 输出当前问题编号
    deleteproblem(index) {
      this.problemlist.splice(index, 1);
    },
    //行拖拽
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.problemlist.splice(oldIndex, 1)[0]
          _this.problemlist.splice(newIndex, 0, currRow)
        }
      })
    },
  },
};
</script>

<style scoped>
.box {
  width: 80%;
  margin: 20px auto;
}
</style>
