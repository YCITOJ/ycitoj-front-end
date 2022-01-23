<template>
  <div class="box">
    <el-form  ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <mavon-editor v-model="form.content" :toolbars="markdownOption" />
      </el-form-item>
      <el-button type="primary" @click="addclass" class="button">提交</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        title: '',
        content: '',
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
    };
  },
  methods: {
    async addclass() {
        const { data: res } = await this.$http.post(
          "discussion/create_topic",
          this.form
        );
        console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.message);
        }
        this.$message.success(res.meta.message);
        this.$router.push("/discuss");
    },
  },
};
</script>
<style scoped>
.box {
  width: 80%;
  margin: 20px auto;
}
.button {
    margin-left: 80px;
}
</style>