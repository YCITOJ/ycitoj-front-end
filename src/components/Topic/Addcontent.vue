<template>
    <div>
      <mavon-editor v-model="vlaue" :toolbars="markdownOption" @save="save" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
               num: '',
               data: '',
            },
            vlaue: '',
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
               save: true, // 保存（触发events中的save事件）
               /* 1.4.2 */
               navigation: false, // 导航目录
               /* 2.1.8 */
               alignleft: false, // 左对齐
               aligncenter: false, // 居中
               alignright: false, // 右对齐
               /* 2.2.1 */
               subfield: true, // 单双栏模式
               preview: true, // 预览
            }          
        }
    },
    methods: {
        change(value, render) {
          this.form.data = render;
        },
         async save() {
           this.form.num = this.$route.query.id
           this.form.data = this.vlaue
           console.log(this.form)
           const { data: res } = await this.$http.post('problems/write_problem', this.form)
           console.log(res)
           if (res.meta.status !== 200) {
             return this.$message.error('添加失败！')
           }
           this.$message.success("添加成功");
           },
           
         }
}
</script>
<style scoped>
</style>
