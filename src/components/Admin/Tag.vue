<template>
  <div class="tag_box">
    <el-card>
      <el-button type="primary" @click="dialogVisible = true"
        >添加标签</el-button
      >
      <el-table :data="tag_box" style="width: 100%" :cell-style="styleBack">
        <el-table-column prop="id" label="编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="color" label="颜色" width="180"></el-table-column>
        <el-table-column label="操作" width="210">
        <template slot-scope="scope">
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click.native.stop="removeTagById(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="添加标签" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="create_tag" label-width="80px">
        <el-form-item label="标签名称">
          <el-input v-model="create_tag.name"></el-input>
        </el-form-item>
        <el-form-item label="标签颜色">
          <el-color-picker v-model="create_tag.color"></el-color-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createTag"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tag_box: {},
      //控制添加标签显示问题
      dialogVisible: false,
      create_tag: {
          name: "",
          color:""
      }
    };
  },
  created() {
    this.getTagList();
  },
  methods: {
    // 获取标签
    async getTagList() {
      const { data: res } = await this.$http.get("tag/tag_list?page_no=1");
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.tag_box = res.data;
    },
    //创建标签
    async createTag() {
    const { data: res } = await this.$http.post("tag/create_tag",this.create_tag);
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
     this.$message.success(res.meta.message);
     this.getTagList();
     this.dialogVisible=false;
    },
    // 根据Id删除对应的题目
    async removeTagById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该标签, 是否继续?",
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
        "tag/del_tag",{tag_id:id}
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success(res.meta.message);
      this.getTagList();
    },

    styleBack({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 2) {
        return { backgroundColor: row.color };
      }
    },
  },
};
</script>
<style scoped>
.tag_box {
  margin: 20px 20px 0 20px;
}
</style>
  