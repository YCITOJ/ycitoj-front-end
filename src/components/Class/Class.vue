<template>
  <div class="box">
    <!-- 搜索与添加区域 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入班级" v-model="query" clearable>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="addDialogVisible" v-if="userlevel">创建班级</el-button>
        <el-button type="success" @click="student_add_class"
          >加入班级</el-button
        >
      </el-col>
    </el-row>
    <el-table
      :data="classlist"
      style="width: 100%"
      @row-click="gotoClassHome"
      class="classlist"
    >
      <el-table-column prop="class_id" label="班级编号" width="180">
      </el-table-column>
      <el-table-column prop="class_name" label="班级名称" width="180">
      </el-table-column>
      <el-table-column
        prop="intro"
        label="介绍"
        width="500"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column label="操作" v-if="userlevel">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click.native.stop="reviseClass(scope.row.class_id)"
          ></el-button>
           <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click.native.stop="del_class(scope.row.class_id)"
            ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 加入班级 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form label-width="80px">
        <el-form-item label="班级ID">
          <el-input v-model="addourclass.class_id"></el-input>
        </el-form-item>
        <el-form-item label="邀请码">
          <el-input v-model="addourclass.invite_code"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="join_class">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      classlist: [],
      //　搜索内容
      query: "",
      userlevel: false,
      addourclass: {
        class_id: "",
        invite_code: "",
      },
      // 对话框的弹出
      dialogVisible: false,
      del_class_from: {
        class_id: ""
      },
    };
  },
  created() {
    this.getClassList();
    this.getuserlevel();
  },
  methods: {
    async getClassList() {
      const { data: res } = await this.$http.get("class/home");
      if (res.meta.status !== 200) {
        return console.log("获取班级列表失败！");
      }
      //console.log(res);
      this.classlist = res.data;
    },
    // 跳转到添加题目
    addDialogVisible() {
      this.$router.push("/addclass");
    },
    // 进入班级页面
    gotoClassHome(row) {
      this.$router.push({ path: "/classhome", query: { id: row.class_id } });
    },
    // 获取用户等级
    getuserlevel() {
      if (window.localStorage.getItem("access") <=1 ) this.userlevel = true;
    },
    // 进入修改页面
    reviseClass(class_id) {
      this.$router.push({ path: "/reviseclass", query: { id: class_id } });
    },
    // 加入班级
    student_add_class() {
      this.dialogVisible = true;
    },
    async join_class() {
      const { data: res } = await this.$http.post("class/join_class", this.addourclass);
      console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success(res.meta.message);
      this.dialogVisible = false;
    },

     // 根据班级Id删除对应的班级
    async del_class(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该班级, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      // console.log(this.form.num);
      this.del_class_from.class_id = id;
      const { data: res } = await this.$http.post(
        "class/delete_class",
        this.del_class_from
      );
       //console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success("删除成功");
      this.getClassList();
    },
  },
};
</script>
<style scoped>
.box {
  width: 80%;
  margin-top: 40px;
  margin-left: 160px;
}
.classlist {
  margin-top: 40px;
}
</style>