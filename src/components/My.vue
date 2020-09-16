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
      <van-cell-group style="margin-top: 20px;">
        <van-cell title="我的资料" is-link :to="`/myInformation`">
          <template #icon>
            <van-icon class="iconfont" class-prefix="icon" slot="left-icon" name="icon-user"></van-icon>
          </template>
        </van-cell>
        <van-cell title="版本号" value="v1.0"  >
          <template #icon>

            <van-icon class="iconfont" class-prefix="icon" slot="left-icon" name="banben"></van-icon>
          </template>
        </van-cell>
      </van-cell-group>
      <div style="position: fixed;bottom: 60px;width: 100%;">
        <div style="padding: 0 15px;">
          <van-button type="info" size="large" color="#c30000" @click="goLogin">退出账号</van-button>
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
  .navBox >>> .van-ellipsis{
    font-weight: 600;
    font-size: 20px;
  }
  .van-cell >>> .icon-icon-user,.icon-banben{
    font-size: 20px;
    color: #cccccc;
    margin-right: 7px;
  }
  .userTop{
    padding: 30px 0;
    background-color: #ffffff;
  }
.nameBox{
  margin-top: 0.7rem;
  font-size: 0.5rem;
  line-height: 0.8rem;
}
.userBox{
  font-size: 0.45rem;
  line-height: 0.7rem;
  color: #cccccc;
}
  .icon-yonghu1{
    font-size: 2.7rem;
    color: #cccccc;
    text-align: center;
    margin: 0 auto;
  }
</style>
