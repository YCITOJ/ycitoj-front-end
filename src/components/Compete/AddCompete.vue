<template>
  <div class="box">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="比赛名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="添加题目">
        <el-input
          placeholder="请输入题目编号"
          v-model="problemid"
          clearable>
          <el-button
            slot="append"
            icon="el-icon-download"
            @click="addProblemId"
          ></el-button>
        </el-input>
        <el-table
      :data="problemlist"
      style="width: 40%">
      <el-table-column prop="id" label="题目编号">
      </el-table-column>
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
      <el-form-item label="比赛类型">
        <el-radio-group v-model="form.contest_type">
          <el-radio label="1">ICPC</el-radio>
          <el-radio label="2">OI</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="比赛说明">
        <mavon-editor v-model="form.info" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="putRace">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        problem_sets: "",
        start: "",
        end: "",
        manager: "",
        contest_type: "1",
        info: "",
      },
      // 添加比赛题目编号
      problemid: '',
      problemlist: [
      ],
    };
  },
  methods: {
    // 提交比赛
    async putRace() {
    if(this.problemlist.length<=0){
      return this.$message.error("请添加题目！");
    }
     this.form.problem_sets=`${this.problemlist[0].id}`
     for( var i=1;i<this.problemlist.length;i++)
      {
        this.form.problem_sets=`${this.form.problem_sets}|${this.problemlist[i].id}`
      }
      //console.log(this.form.problem_sets);
    this.form.manager =  window.localStorage.getItem("userid");
    console.log(this.form);
     const { data: res } = await this.$http.post("contest/add_new_contest",this.form);
    console.log(res);
     if(res.meta.status === 400){
        return this.$message.error("比赛创建失败！");
      }
    this.$message.success("比赛创建成功！");
     this.$router.push({ path: "/ReviseCompete" });
    },
    async addProblemId() {
      const { data: res } = await this.$http.get(`problems/prob_exists?num=${this.problemid}`);
      if(res.meta.status === 400){
        return this.$message.error("题目编号不存在！");
      }
      let newlist= {
        id: ""
      }
      newlist.id=this.problemid;
      this.problemlist.push(newlist);
    },
    // 输出当前问题编号
    deleteproblem(index) {
      console.log(index)
      this.problemlist.splice(index, 1);
      console.log(this.problemlist)
    }
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
