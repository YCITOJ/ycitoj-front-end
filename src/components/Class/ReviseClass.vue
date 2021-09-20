<template>
  <div class="box">
    <el-form :rules="rules" ref="form" :model="form" label-width="80px">
      <el-form-item label="班级名称" prop="class_name">
        <el-input v-model="form.class_name"></el-input>
      </el-form-item>
      <el-form-item label="教师id" prop="teacher_id">
        <el-input v-model="form.teacher_id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="介绍">
        <mavon-editor v-model="form.intro" :toolbars="markdownOption" />
      </el-form-item>
      <el-button type="primary" @click="reviseclass" class="button">提交</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        class_id: "",
        intro: "",
        teacher_id: "",
        class_name: ""
      },
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: false, // 链接
        imagelink: false, // 图片链接
        code: false, // code
        table: false, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: false, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: false, // 导航目录
        /* 2.1.8 */
        alignleft: false, // 左对齐
        aligncenter: false, // 居中
        alignright: false, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
       rules: {
        class_name: [
          { required: true, message: '请输入教室名称', trigger: "blur" },
        ],
        teacher_id: [
          { required: true, message: '请输入教师id', trigger: "blur" },
        ],
       }
    };
  },
  created() {
    this.getClassList();
  },
  methods: {
      // 获取班级信息
    async getClassList() {
        const { data: res } = await this.$http.get(`class/myclass?class_id=${this.$route.query.id}`);
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.message);
        }
        this.form = res.data;
    },
    reviseclass() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        this.form.class_id = this.$route.query.id;
        const { data: res } = await this.$http.post(
          "class/update_class",
          this.form
        );
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.message);
        }
        this.$message.success("添加成功");
        this.$router.push("/class");
      });
    },
  },
};
</script>
<style scoped>
.box {
  width: 80%;
  padding-left: 10%;
  padding-top: 20px;
}
.button {
    margin-left: 80px;
}
</style>