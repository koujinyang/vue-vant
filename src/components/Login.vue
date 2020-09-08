<template>
  <div class="hello">
    <!-- 登录页 用户表单 -->
    <div class="box" >
      <div style="text-align: center ;margin-bottom: 1rem;">
        <span class="icon iconfont icon-yonghu"></span>
      </div>
      <van-field
        v-model="username"
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        left-icon="contact"
        :border="false"
        @click-right-icon="$toast('用户名必须是手机号')"
      >
        <van-icon class="iconfont" class-prefix="icon" slot="left-icon" name="icon-user"></van-icon>
      </van-field>

      <van-field
        v-model="password"
        clearable
        type="password"
        label="密码"
        right-icon="question-o"
        placeholder="请输入密码"
        left-icon="mima"
        :border="false"
        @click-right-icon="$toast('密码必须是数字、字母、下划线')"
        style="margin-top: 20px"
      >
        <van-icon class="iconfont" class-prefix="icon" slot="left-icon" name="mima"></van-icon>

      </van-field>
      <!--登录按钮-->
      <div class="pd15"><van-button type="danger" size="large" @click="onClickButtonSubmit">登录</van-button></div>
    </div>
  </div>
</template>

<script>
  // import axios from 'axios'
  // const token = '123456';
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
          this.$toast.success('登录成功');
          this.$router.push({name:'Index'})
          // this.$toast('token='+token);
          // var that=this // 放置指针，便于then操作的获取
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
  .van-field >>> .icon-mima,.icon-icon-user{
    font-size: 25px;
  }
  .van-field >>> .van-cell__title{
    font-size: 0.5rem;
    line-height: 0.7rem;
  }
  .van-field >>> .van-field__label{
    width: 2.5rem;
  }
  .icon-yonghu{
    font-size: 200px;
    color: #cccccc;
    text-align: center;
    margin: 0 auto;
    color: #ff0000;
  }
  .hello{
    /*display: table-cell;*/
    /*vertical-align: middle;*/
    /*text-align: center;*/
    height: 100%;
    /*background: #2c3e50;*/
  }
  .box{
    position: absolute;
    top:40%;
    left:50%;
    width:90%;
    transform:translate(-50%,-50%);
  }
  .pd15{
    /*padding: 15px;*/
    margin-top: 20px;
  }
</style>

