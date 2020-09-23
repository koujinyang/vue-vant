<template>
<div>

  <van-nav-bar
    title="工作台"
    fixed
    placeholder
    class="navBox"
  />
  <div class="myDistribution">我的分配</div>
  <van-grid :column-num='3'>
    <van-grid-item  class="gridBox"  @click="toFeipei(2)">
      <div class="textNumber">{{NotReplyCount}}</div>
      <div class="gardText">待反馈</div>
    </van-grid-item>
    <van-grid-item class="gridBox"  @click="toFeipei(3)">
      <div class="textNumber">{{NotProcessCount}}</div>
      <div class="gardText">待处理</div>
    </van-grid-item>
    <van-grid-item class="gridBox"  @click="toFeipei(4)">
      <div class="textNumber">{{IsContract}}</div>
      <div class="gardText">已签合同</div>
    </van-grid-item>
    <van-grid-item class="gridBox"  @click="toFeipei(5)">
      <div class="textNumber">{{todayassign}}</div>
      <div class="gardText">今日分配</div>
    </van-grid-item>
    <van-grid-item class="gridBox"  @click="toFeipei(6)">
      <div class="textNumber">{{monthassign}}</div>
      <div class="gardText">本月分配</div>
    </van-grid-item>
    <van-grid-item class="gridBox"  @click="toFeipei(1)">
      <div class="textNumber">{{AllCount}}</div>
      <div class="gardText">全部数量</div>
    </van-grid-item>
<!--    <van-grid-item  text="我的分配" @click="toFeipei">-->
<!--      <van-icon class="iconfont" class-prefix="icon" slot="icon" name="woderenwu"></van-icon>-->
<!--    </van-grid-item>-->
  </van-grid>

<!--  <div class="myDistribution">我的台账</div>-->

<!--  <van-grid :column-num='3'>-->
<!--    <van-grid-item   class="gridBox" >-->
<!--      <div class="textNumber">15,000</div>-->
<!--      <div class="gardText">代开票金额</div>-->
<!--    </van-grid-item>-->
<!--    <van-grid-item   class="gridBox">-->
<!--      <div class="textNumber">15,000</div>-->
<!--      <div class="gardText">本月收入</div>-->
<!--    </van-grid-item>-->
<!--&lt;!&ndash;    <van-grid-item    @click="toFeipei">&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="textNumber">15,000</div>&ndash;&gt;-->
<!--&lt;!&ndash;      <div>敬请期待</div>&ndash;&gt;-->
<!--&lt;!&ndash;    </van-grid-item>&ndash;&gt;-->

<!--        <van-grid-item class="gridBox" text="敬请期待">-->
<!--          <van-icon class="iconfont" class-prefix="icon" slot="icon" name="ziyuanldpi"></van-icon>-->
<!--          <template #text>-->
<!--            <div class="gardText">敬请期待</div>-->
<!--          </template>-->
<!--        </van-grid-item>-->
<!--  </van-grid>-->
</div>
</template>

<script>
    export default {
        name: "Work",
      data(){
        return{
          NotReplyCount:"",
          NotProcessCount:"",
          IsContract:"",
          todayassign:"",
          monthassign:"",
          AllCount:"",
        }
      },
      methods:{
        getData(){

          let that=this;
          that.fetchPost("restApi/mobile/workbench",{}).then((res)=>{
            console.log(res);
            that.NotReplyCount=res.data.data.NotReplyCount;
            that.NotProcessCount=res.data.data.NotProcessCount;
            that.IsContract=res.data.data.IsContract;
            that.todayassign=res.data.data.todayassign;
            that.monthassign=res.data.data.monthassign;
            that.AllCount=res.data.data.AllCount;
          }).catch(

          )
        },

        toFeipei(id){
          this.$router.push({
            path: `/Fenpei/${id}`,
          })
        },
      },
      mounted() {
        this.getData();
      }
    }
</script>

<style scoped>
  .gridBox >>> .van-grid-item__content::after{
    border-width: 0 2px 2px 0;
  }
  .gridBox{
    height: 172px;
  }
  .navBox >>> .van-ellipsis{
    font-weight: 600;
    font-size: 20px;
  }
  .myDistribution{
    font-size: 0.4rem;
    line-height: 1.2rem;
    color: #5c5c5c;
    /*background-color: #cccccc;*/
    padding: 0 30px;
  }

  .textNumber{
    font-size: 0.5rem;
    color: #d51927;
  }

  .gardText{
    margin-top: 10px;
    font-size: 0.4rem;
    color: #5c5c5c;
  }
  .icon-ziyuanldpi{
    font-size: 0.5rem;
    color: #d51927;
  }
</style>
