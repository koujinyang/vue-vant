<template>
    <div class="innerBox">
      <div class="box">

        <div style="text-align: center">
          <span class="icon iconfont icon-yonghu1"></span>
        </div>
        <div class="userName">北京在明律师事务所</div>
        <div class="systemBox">案件管理系统</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Start",
      mounted() {
          let that=this;
          setTimeout(function () {
            that.$router.push({ path:'/login'});
          },3000)
      }
    }
</script>

<style scoped>
  .userName{
    text-align: center;
    font-size: 55px;
    font-weight: 700;
    line-height: 1.3rem;
  }
  .systemBox{
    text-align: center;
    font-size: 50px;
    color: #cccccc;
    line-height: 1.3rem;
  }
.innerBox{
  height: 100%;
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
