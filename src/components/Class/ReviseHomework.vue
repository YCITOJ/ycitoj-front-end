<template>
  <div class="box"
  v-loading="loading"
   element-loading-text="拼命加载中"
   element-loading-spinner="el-icon-loading"
   element-loading-background="#ffffff">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="作业名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="添加题目">
        <div>
          <el-input
            placeholder="请输入题目编号"
            v-model="problemid"
            clearable
            style="width: 40%"
          ></el-input>
          <el-input v-model="score" placeholder="请输入分值" style="width: 10%"></el-input>
          <el-button
            slot="append"
            icon="el-icon-download"
            @click="addProblemId"
          ></el-button>
        </div>

        <el-table :data="problemlist" style="width: 80%" row-key="id">
          <el-table-column prop="id" label="题目编号"> </el-table-column>
          <el-table-column prop="name" label="题目名称"> </el-table-column>
          <el-table-column prop="score" label="题目分值"> </el-table-column>
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
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="form.start"
          style="width: 300px"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日 H 点 m 分 s 秒"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          v-model="form.end"
          style="width: 300px"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日 H 点 m 分 s 秒"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="作业说明">
        <mavon-editor v-model="form.info" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="putRace">立即创建</el-button>
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
        class_id: "",
        homework_id: "",
        title: "",
        info: "",
        start: "",
        end: "",
        prob_list: "",
      },
      // 添加作业题目编号
      problemid: "",
      score: "",
      problemlist: [],
      // 页面加载
      loading: true,
    };
  },
  created() {
    this.getHomework();
  },
  mounted() {
    this.rowDrop()
  },
  methods: {
    // 获取作业
    async getHomework() {
        const { data: res } = await this.$http.get(`homework/homework?id=${this.$route.query.homework_id}`);
      if (res.meta.status === 400) {
        return this.$message.error(res.meta.message);
      }
      this.form.title = res.data.title;
      this.form.start= res.data.start_time;
      this.form.end= res.data.end_time;
      this.form.info= res.data.information;
      this.problemlist = res.data.prob_list;

      this.loading = false
    },
    // 修改作业
    async putRace() {
      if (this.problemlist.length <= 0) {
        return this.$message.error("请添加题目！");
      }
      this.form.prob_list = `${this.problemlist[0].id},${this.problemlist[0].score}`;
      for (var i = 1; i < this.problemlist.length; i++) {
        this.form.prob_list = `${this.form.prob_list}|${this.problemlist[i].id},${this.problemlist[i].score}`;
      }
      this.form.class_id = this.$route.query.class_id;
      this.form.homework_id = this.$route.query.homework_id;
      const { data: res } = await this.$http.post(
        "homework/update_homework",
        this.form
      );
      if (res.meta.status === 400) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success(res.meta.message);
      this.$router.go(-1);
    },
    async addProblemId() {
      if(this.score.length<=0){
          return this.$message.error("请输入分值！");
      }
      const { data: res } = await this.$http.get(
        `problems/prob_exists?num=${this.problemid}`
      );
      if (res.meta.status === 400) {
        return this.$message.error("题目编号不存在！");
      }
      let newlist = {
        id: "",
        name: "",
        score: ""
      };
      newlist.id = this.problemid;
      newlist.name = res.title;
      newlist.score = this.score;
      this.problemlist.push(newlist);
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
  margin-left: 10%;
  margin-top: 20px;
  width: 80%;
}
</style>
