<template>
  <div>
    <div class="card1">
      <div class="card1-1 border_style">
        <div class="border_style_header">
          <h4>公告</h4>
        </div>
        <div class="main"></div>
      </div>
      <div class="card1-2 border_style">
        <div class="border_style_header">
          <h4>排名</h4>
        </div>
        <div class="main"></div>
      </div>
    </div>
    <div class="card2">
      <div class="card2-1 border_style">
        <div class="border_style_header">
          <h4>通知</h4>
        </div>
        <div class="main"></div>
      </div>
      <div class="card2-2 border_style">
        <div class="border_style_header">
          <h4>近期通知</h4>
        </div>
        <div class="main"></div>
      </div>
      <div class="card2-3 border_style">
        <div class="border_style_header">
          <h4>友情链接</h4>
        </div>
        <div class="main"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card1 {
  float: left;
  margin-top: 30px;
  margin-left: 17%;
  width: 51%;
}
.card2 {
  float: right;
  margin-top: 30px;
  margin-right: 8%;
  width: 23%;
}
/* 边框样式 */
.border_style {
  border: 1px solid #d4d4d5;
  border-radius: 6px;
}
.border_style_header {
  border-bottom: 1px solid #d5d4d4;
  height: 50px;
  background-color: #f5f3f3;
}
h4 {
  margin: 0;
  padding-left: 3%;
  line-height: 50px;
}

.card1-1 {
  height: 400px;
}
.card1-2 {
  margin-top: 20px;
  height: 800px;
}

.card2-1 {
  height: 300px;
}
.card2-2 {
  margin-top: 20px;
  height: 650px;
}
.card2-3 {
  margin-top: 20px;
  height: 220px;
}
</style>
