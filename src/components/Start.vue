<template>
    <div class="innerBox">
      <div class="box">

        <div style="text-align: center">
<!--          <span class="icon iconfont icon-yonghu1"></span>-->
          <van-image  class="logoImgs" :src="logo" />
        </div>
        <div class="userName">北京在明律师事务所</div>
        <div class="systemBox">案件管理系统</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Start",
      data(){
        return{
          logo:require('../assets/images/logo.png')
        }
      },
      methods:{
      },
      mounted() {
          let that=this;
          setTimeout(function () {
            if(localStorage.getItem("isLogin")=='yes'){
              that.$router.push({ path:'/index'});
            }else {
              that.$router.push({ path:'/login'});
            }

          },3000)
      }
    }
</script>

<style scoped>
  .logoImgs{
    width: 105px;
    height: 165px;
  }
  .userName{
    margin-top: 70px;
    color: #5a5962;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    /*line-height: 1.3rem;*/
  }
  .systemBox{
    margin-top: 24px;
    text-align: center;
    font-size: 30px;
    color: #5c5c5c;
    /*line-height: 1.3rem;*/
  }
.innerBox{
  height: 100%;
  background-color: #ffffff;
}
.box{
  position: absolute;
  top:40%;
  left:50%;
  width:90%;
  transform:translate(-50%,-50%);
}
  .icon-yonghu1{
    font-size: 200px;
    color: #cccccc;
    text-align: center;
    margin: 0 auto;
  }
</style>
