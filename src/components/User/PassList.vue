<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>通过题目</span>
        <span>通过：{{PassList.length}}</span>
      </div>
      <!-- <div v-for="index in PassList.length" :key="index" class="text item">
         <span>{{PassList[index-1].num}}</span>
      </div> -->
      <el-row :gutter="4">
          <el-col
            :span="3"
            style="margin:15px 0px;"
            v-for="(item, index) in PassList"
            :key="index"
          >
            <el-link type="primary" style="font-size:15px" @click="gotosubmit(item.num)">{{ item.num }}</el-link>
          </el-col>
        </el-row>
    </el-card>
</template> 

<script>
export default {
    data(){
        return{
            PassList: [],
        }
    },
   created() {
       this.get_pass_list();
   },
    methods: {
        //获取通过题目列表
        async get_pass_list(){
            const { data: res } = await this.$http.get("user/passed_list");
            if (res.meta.status !== 200) {
                return this.$message.error(res.meta.message);
            }
            this.PassList = res.data;
        },
        //进入题目
        gotosubmit(row) {
        this.$router.push({ path: "/submit", query: { id: row,where: 'topic' } });
        },
    }
};
</script>

<style>
.box-card {
    margin-top: 10px;
}
.text span{
    display: block;
    width: 100px;
    text-align: center;
    background-color: #000;
}
.clearfix span:nth-child(2) {
    float: right;
}
</style>

