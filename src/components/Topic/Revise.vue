<template>
  <div class="box">
    <el-form :rules="rules" ref="form" :model="form" label-width="80px">
      <el-form-item label="题目编号" prop="num">
        <el-input v-model="form.num" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="题目名称" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form
        :rules="rules"
        :inline="true"
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="题目难度" prop="difficulty">
          <el-select v-model="form.difficulty" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间限制" prop="time_limit">
          <el-input v-model="form.time_limit">
            <template slot="append">ms</template>
          </el-input>
        </el-form-item>
        <el-form-item label="空间限制" prop="memory_limit">
          <el-input v-model="form.memory_limit">
            <template slot="append">MB</template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-form-item label="是否公开" prop="is_public">
        <el-radio-group v-model="form.is_public">
          <el-radio label="1">公开</el-radio>
          <el-radio label="0">不公开</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="编辑题目">
        <mavon-editor v-model="form.content" :toolbars="markdownOption" />
      </el-form-item>
      <el-button type="primary" @click="addpb" @keyup.enter="addpb">提交</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        num: "",
        title: "",
        difficulty: "",
        memory_limit: "",
        time_limit: "",
        content: "",
        is_public: "0",
      },
      // 题目难度
      options: [
        {
          value: "1",
          label: "入门",
        },
        {
          value: "2",
          label: "简单",
        },
        {
          value: "3",
          label: "中等",
        },
        {
          value: "4",
          label: "较难",
        },
        {
          value: "5",
          label: "困难",
        },
      ],
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
        num: [
          { required: true, message: "请输入题目编号", trigger: "blur" },
          {
            pattern: /^[0-9A-Za-z]{2,10}$/,
            message: "编号只包含(2~10)数字和字母",
            trigger: "blur",
          },
        ],
        title: [{ required: true, message: "请输入题目名称", trigger: "blur" }],
        memory_limit: [
          { required: true, message: "请输入空间限制", trigger: "blur" },
          {
            pattern: /^[0-9]{1,10}$/,
            message: "输入空间格式不正确",
            trigger: "blur",
          },
        ],
        time_limit: [
          { required: true, message: "请输入时间限制", trigger: "blur" },
          {
            pattern: /^[0-9]{1,10}$/,
            message: "输入时间格式不正确",
            trigger: "blur",
          },
        ],
      }
    };
  },
  created() {
    this.readproblem();
    var lett = this;
    document.onkeydown = function (e) {
      var key = window.event.keyCode;
      if (key == 13) {
        lett.addpb();
      }
    };
  },
  methods: {
    change(value, render) {
      this.form.content = render;
    },
    async readproblem() {
      this.form.num = this.$route.query.id;
      const { data: res } = await this.$http.get(
        "problems/read_problem?num=" + this.form.num
      );
      //console.log(res.data);
      //console.log(res)
      this.form.content = res.data;
      this.form.num = res.info.num;
      this.form.title = res.info.title;
      this.form.time_limit = res.info.time_limit;
      this.form.memory_limit = res.info.memory_limit;
      this.form.difficulty = res.info.difficulty+'';
      this.form.is_public = res.info.is_public.toString();
    },
     addpb() {
    this.$refs.form.validate(async (valid) => {
    if (!valid) return;
    const { data: res } = await this.$http.post(
        "problems/update_problem",
        this.form
      );
      //console.log(this.form);
      if (res.meta.status !== 200) {
        return this.$message.error("修改失败！");
      }
      this.$message.success("修改成功");
      this.$router.go(-1);  
      })   
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
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 600px;
}
</style>
