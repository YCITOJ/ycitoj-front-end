<template>
  <div>
    <div class="card1">
      <div class="card1-1 border_style">
        <div class="border_style_header">
          <h4>公告</h4>
        </div>
        <div class="main"></div>
      </div>
      <!-- <div class="card1-2 border_style">
        <div class="border_style_header">
          <h4>排名</h4>
        </div>
        <div class="main"></div>
      </div> -->
    </div>
    <div class="card2">
      <!-- <div class="card2-1 border_style">
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
      </div> -->
      <div class="card2-3 border_style">
        <div class="border_style_header">
          <h4>友情链接</h4>
          <div class="box">
            <a href="https://codeforces.com/">
              <div class="img">
                <img src="../../assets/img/codeforces.png" />
              </div>
            </a>
            <p>codeforces</p>
          </div>
          <div class="box">
            <a href="https://www.luogu.com.cn/">
              <div class="img">
                <img src="../../assets/img/logosingle.png" />
              </div>
            </a>
            <p>洛谷</p>
          </div>
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
  height: 300px;
}
.card2-3 {
  height: 400px;
}

.box {
  float: left;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  align-content: center;
  width: 100px;
  height: 140px;
  margin: 35px;
}

.box .img {
  width: 100px;
  height: 100px;
  box-shadow: 18px 18px 30px rgba(0, 0, 0, 0.1),
    -18px -18px 30px rgba(255, 255, 255, 1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #efeeee;
  transition: box-shadow 0.2s ease-out;
  position: relative;
}

.box .img img {
  width: 60px;
  transition: width 0.2s ease-out;
}

.box p {
  color: slategrey;
}

.box .img:hover {
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2),
    0px 0px 0px rgba(255, 255, 255, 0.8),
    inset 18px 18px 30px rgba(0, 0, 0, 0.1),
    inset -18px -18px 30px rgba(255, 255, 255, 1);
  transition: box-shadow 0.2s ease-out;
}

.box .img:hover img {
  width: 58px;
  transition: width 0.2s ease-out;
}
</style>
