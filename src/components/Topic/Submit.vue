<template>
    <div class="box">
        <el-container>
     <el-aside width="50%">
        <p>{{num}}</p>
        <mavon-editor
        class="md"
        v-model="value"
        :value="webDataString"
        :subfield="false"
        :defaultOpen="'preview'"
        :toolbarsFlag="false"
        :editable="false"
        :scrollStyle="true"
        :ishljs="true"
      />
   </el-aside>
  <el-main>编辑区</el-main>
</el-container>
        
    </div>
</template>
<script>
export default {
    data() {
        return　{
            value: '$1+1=2$',
            num: '1.x和y的差'
        }
    }
}
</script>
<style scoped>
.box {
    margin-left: 40px;
    margin-right: 40px;
}
.md {
    margin-top: 60px;
    
}
</style>