<template>
    <div>
      <van-nav-bar
        title="我的"
        fixed
        placeholder
        class="navBox"
      />
      <van-row class="userTop">
        <van-col span="12" style="text-align: right">
          <span class="icon iconfont icon-yonghu1"></span>
        </van-col>
        <van-col span="12">
          <div class="nameBox">{{name}}</div>
          <div class="userBox">{{account}}</div>
        </van-col>
      </van-row>
      <van-cell-group style="margin-top: 0.267rem;">
        <van-cell title="我的资料" is-link :to="`/myInformation`" title-class="myCellTitle">
          <template #icon>
            <van-icon class="iconfont" class-prefix="icon" slot="left-icon" name="icon-user"></van-icon>
          </template>
        </van-cell>
        <van-cell title="版本号" value="v1.0"   title-class="myCellTitle">
          <template #icon>

            <van-icon class="iconfont" class-prefix="icon" slot="left-icon" name="banben"></van-icon>
          </template>
        </van-cell>
      </van-cell-group>
      <div style="" class="bottomBox">
        <div style="" class="bottomBox1">
          <van-button type="info" size="large" class="bottomBoxButton" color="#d51927" @click="goLogin">退出账号</van-button>
        </div>

      </div>
    </div>
</template>

<script>
    export default {
        name: "My",
      data(){
          return{
            id:"1",
            name:"",
            account:""

          }
      },
      methods:{
        getUserData(){
          let that=this;
          that.fetchPost("restApi/mobile/myinfo",{}).then((res)=>{
            console.log(res);
            console.log(res);
            that.name=res.data.data.name;
            that.account=res.data.data.account;
          }).catch(

          )
        },
        goLogin(){
          this.$dialog.confirm({
            message: '确定退出当前账号？',
          }) .then(() => {
            // on confirm
            localStorage.setItem("access_token", "");
            localStorage.setItem("isLogin", "");
            this.$router.push({ path:'/login'});
          })
            .catch(() => {
              // on canceltu
            });
        },
      },
      mounted() {
          this.getUserData();

      }
    }
</script>

<style scoped>
  .myCellTitle{
    font-size: 0.4rem;
    color: #5c5c5c;
  }
  .bottomBoxButton{
    border-radius: 8px;
    /*font-size: 24px;*/
  }
  .bottomBox{
    position: fixed;
    bottom: 150px;
    width: 100%;
  }
  .bottomBox1{
    padding: 0 20px;
  }
  .navBox >>> .van-ellipsis{
    font-weight: 600;
    font-size: 20px;
  }
  .van-cell >>> .icon-icon-user,.icon-banben{
    font-size: 0.6rem;
    margin-right: 7px;
    color: #5c5c5c;
  }
  .userTop{
    padding: 30px 0;
    background-color: #ffffff;
  }
.nameBox{
  margin-top: 0.5rem;
  font-size: 0.5rem;
  line-height: 0.6rem;
  margin-left: 20px;
  color: #999999;
}
.userBox{
  font-size: 0.4rem;
  line-height: 0.7rem;
  color: #cccccc;
  margin-left: 20px;
}
  .icon-yonghu1{
    /*height: 1.47rem;*/
    /*width: 1.47rem;*/
    /*display: inline-block;*/
    font-size: 2.04rem;
    color: #999999;
    text-align: center;
    margin: 0 auto;
  }
</style>
