<template>
    <div>
      <van-row class="userTop">
        <van-col span="12" style="text-align: right">
          <span class="icon iconfont icon-yonghu1"></span>
        </van-col>
        <van-col span="12">
          <div class="nameBox">管理员</div>
          <div class="userBox">admin</div>
        </van-col>
      </van-row>
      <van-cell-group style="margin-top: 20px;">
        <van-cell title="我的资料" is-link :to="`/myInformation/${id}`">
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
      <div style="position: fixed;bottom: 80px;width: 100%;">
        <div style="padding: 0 20px;">
          <van-button type="info" size="large" >退出账号</van-button>
        </div>

      </div>
    </div>
</template>

<script>
    export default {
        name: "My",
      data(){
          return{
            id:"1"
          }
      },
      mounted() {

      }
    }
</script>

<style scoped>
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
