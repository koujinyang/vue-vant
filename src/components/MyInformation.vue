<template>
<div>
  <van-nav-bar
    title="我的资料"
    fixed
    placeholder
    left-arrow
    @click-left="onClickLeft"
    class="navBox"
  />
  <div class="userTop">
    <span class="icon iconfont icon-yonghu1"></span>
  </div>
  <van-cell-group>
    <van-field
      v-model="user"
      label="账号"
      input-align="right"
      readonly
    />
    <van-field
      v-model="name"
      label="姓名"
      input-align="right"
      readonly
    />
    <van-field
      v-model="phone"
      label="电话"
      input-align="right"
      readonly
    />
    <van-field
      v-model="email"
      label="邮箱"
      input-align="right"
      readonly
    />
  </van-cell-group>
</div>
</template>

<script>
    export default {
        name: "MyInformation",
      data(){
          return{
            user:"admin",
            name:"张三",
            phone:"15500000000",
            email:"12232425@163.com"
          }
      },
      methods: {
        onClickLeft() {
          this.$router.go(-1)
        },
      }
    }
</script>

<style scoped>

  .navBox >>>.van-icon-arrow-left{
    color: #000000;
  }
  .icon-yonghu1{
    font-size: 2rem;
    color: #cccccc;
    text-align: center;
    margin: 0 auto;
  }
  .userTop{
    padding: 20px 0;
    background-color: #ffffff;
    text-align: center;
  }
</style>
