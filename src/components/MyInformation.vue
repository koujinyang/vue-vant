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
      class="noBottom"
    >
      <template #label>
        <span class="anyuanLabel">账号:</span>
      </template>
      <template #input>
        <span class="anyuanLabel">{{user}}</span>
      </template>
    </van-field>
    <van-field
      v-model="name"
      label="姓名"
      input-align="right"
      readonly
      class="noBottom"
    >
      <template #label>
        <span class="anyuanLabel">姓名:</span>
      </template>
      <template #input>
        <span class="anyuanLabel">{{name}}</span>
      </template>
    </van-field>
    <van-field
      v-model="phone"
      label="电话"
      input-align="right"
      readonly
      class="noBottom"
    >
      <template #label>
        <span class="anyuanLabel">电话:</span>
      </template>
      <template #input>
        <span class="anyuanLabel">{{phone}}</span>
      </template>
    </van-field>
    <van-field
      v-model="email"
      label="邮箱"
      input-align="right"
      readonly
      class="noBottom"
    >
      <template #label>
        <span class="anyuanLabel">邮箱:</span>
      </template>
      <template #input>
        <span class="anyuanLabel">{{email}}</span>
      </template>
    </van-field>
  </van-cell-group>
</div>
</template>

<script>
    export default {
        name: "MyInformation",
      data(){
          return{
            user:"",
            name:"",
            phone:"",
            email:"@163.com"
          }
      },
      methods: {
        getUserData(){
          let that=this;
          that.fetchPost("restApi/mobile/myinfo",{}).then((res)=>{
            that.name=res.data.data.name;
            that.user=res.data.data.account;
            that.phone=res.data.data.phone;
            that.email=res.data.data.email;
          }).catch(

          )
        },
        onClickLeft() {
          this.$router.go(-1)
        },
      },
      mounted() {
          this.getUserData()
      }
    }
</script>

<style scoped>

  .noBottom{
    padding: 10px 32px;
  }
  .noBottom::after{
    border: none;
  }
  .anyuanLabel{
    font-size: 0.4rem;
    color: #5c5c5c;
  }
  .navBox >>> .van-nav-bar__title{
    color: #5c5c5c;
    font-size: 20px;
    font-weight: 600;
  }
  .navBox >>>.van-icon-arrow-left{
    color: #5c5c5c;
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
