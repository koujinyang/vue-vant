<template>
  <div class="hello">

    <van-nav-bar
      title="北京在明律师事务所案件管理系统"
      fixed
      placeholder
      class="navBox"
    />
    <!-- 登录页 用户表单 -->
    <div class="box" >
      <div class="loginImgBox">
        <span class="icon iconfont icon-yonghu"></span>
      </div>
      <van-field
        v-model="username"
        clearable
        label="用户名"
        placeholder="请输入用户名"
        left-icon="contact"
        class="loginField"
      >
        <span slot="label" class="labelText">用户名</span>
        <van-icon class="iconfont" class-prefix="icon" slot="left-icon" name="icon-user"></van-icon>
      </van-field>

      <van-field
        v-model="password"
        clearable
        type="password"
        label="密码"
        placeholder="请输入密码"
        left-icon="mima"
        class="loginField"
      >
        <span slot="label" class="labelText">密码</span>
        <van-icon class="iconfont" class-prefix="icon" slot="left-icon" name="mima"></van-icon>

      </van-field>
      <!--登录按钮-->
      <div class="pd15"><van-button class="loginBtn" color="#d51927" size="large" @click="onClickButtonSubmit">登录</van-button></div>
    </div>
  </div>
</template>

<script>
  // import axios from 'axios'
  // const token = '123456';

  let Base64 = require('js-base64').Base64
  export default {
    name: 'Login',
    data () {
      return {
        errors: [],
        username: "",
        password: ""
      }
    },
    methods: {
      onClickRight() {
        this.$toast('请填写注册信息');
        this.$router.push({ path:'/register'});
      },
      // 表单提交
      onClickButtonSubmit: function () {
        if(this.username == ''){
          this.$toast("用户名不能为空");
          return false;
        }
        if(this.password == ''){
          this.$toast("密码不能为空");
          return false;
        }
        else{
          var that=this // 放置指针，便于then操作的获取

          let dateTime=new Date();
          let timestamp=dateTime.getTime();
          let nonce =dateTime.getTime();
          let stringSignTemp="accesskey=apiuser&nonce="+nonce+"&timestamp="+timestamp+"&secretkey=bb9e490d4dd335b96aed228dc6e6156fi8l3u"
          let sign=this.$md5(stringSignTemp).toUpperCase();
          // param.accesskey="apiuser";
          // param.timestamp=timestamp;
          // param.nonce=nonce;
          // param.sign=sign;
          var param={
            username:that.username,
            password:Base64.encode(that.password+nonce),
            accesskey:"apiuser",
            timestamp:timestamp,
            nonce:nonce,
            sign:sign
          }
          that.fetchGet('restApi/mobile/Login',param).then((res) => {
            console.log(res);
            if(res.data.code==200){
              localStorage.setItem("access_token", res.data.data.access_token);
              this.$router.push({ path:'/index'})
            }else {
              this.$toast(res.data.message);
            }

          }).catch(

          )
          //
          // axios.get('接口地址', {
          //     params: {
          //         userName: this.username
          //     }
          // }).then(function (response) {
          //     console.log(response);
          //     var reslutData=response;
          //     console.log(reslutData.data.status )
          //     if(reslutData.data.status == 1002){
          //         this.$toast(reslutData.data.desc);
          //     }
          //     if(reslutData.data.status == 1000){
          //         this.$toast(reslutData.data.desc);
          //         this.$router.push({
          //             path: '/receData',
          //             query: {
          //                 reslutData
          //             }
          //         });
          //     }
          // }.bind(this))
          //     .catch(function (error) {
          //         console.log("请求失败"+error);
          //     });
          // e.preventDefault();
        }
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .loginBtn{
    border-radius: 8px;
  }
  .loginField{
    margin: 0 30px;
    width: auto;
  }
  /*.loginField {*/
  /*  border-bottom: 1px solid #cccccc;*/
  /*}*/
  .loginImgBox{
    /*margin: 0 auto;*/
    height: 300px;
    text-align: center;
  }
  .navBox{
    height: 1.067rem !important;
  }
  .navBox >>> .van-nav-bar{
    height: 1.067rem !important;
  }
  .navBox >>> .van-nav-bar__title{
    max-width: 100%;
    color: #5c5c5c;
    font-size: 0.2667rem;
    font-weight: 600;
  }

  .navBox >>> .van-nav-bar__text{
    color: #000000;
  }
  .van-field >>> .icon-mima,.icon-icon-user{
    font-size: 0.6rem;
  }
  .labelText{
    font-size: 25px;
  }
  .van-field >>> .van-field__label{
    width: 2.5rem;
  }
  .icon-yonghu{
    font-size: 215px;
    text-align: center;
    margin: 0 auto;
    color: #d51927;
    line-height: 300px;
  }
  .hello{
    /*display: table-cell;*/
    /*vertical-align: middle;*/
    /*text-align: center;*/
    height: 100%;
    background: #f9f9f9;
  }
  .box{
    /*position: absolute;*/
    /*top:40%;*/
    /*left:50%;*/
    /*width:90%;*/
    /*transform:translate(-50%,-50%);*/
  }
  .pd15{
    padding: 0 30px;
    margin-top: 30px;
  }
</style>

