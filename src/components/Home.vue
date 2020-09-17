<template>
  <div>

<!--    <van-swipe :autoplay="3000">-->
<!--      <van-swipe-item v-for="(image, index) in images" :key="index">-->
<!--        <img v-lazy="image" class="swipImg"/>-->
<!--      </van-swipe-item>-->
<!--    </van-swipe>-->

    <van-nav-bar
      title="首页"
      fixed
      placeholder
      class="navBox"
    />
    <van-image
      width="100%"
      lazy-load
      class="indexImg"
      :src="indexImg"
    />
      <div class="myDistribution">我的分配</div>

    <van-grid :column-num='3'>
      <van-grid-item class="gridBox"   @click="toFeipei(2)">
        <div class="textNumber">{{NotReplyCount}}</div>
        <div class="gardText">待反馈</div>
      </van-grid-item>
      <van-grid-item   @click="toFeipei(3)">
        <div class="textNumber">{{NotProcessCount}}</div>
        <div class="gardText">待处理</div>
      </van-grid-item>
<!--      <van-grid-item  text="我的分配" @click="toFeipei(1)">-->
<!--        <van-icon class="iconfont" class-prefix="icon" slot="icon" name="woderenwu"></van-icon>-->
<!--      </van-grid-item>-->
      <van-grid-item   @click="toFeipei(1)">
        <div class="textNumber">{{AllCount}}</div>
        <div class="gardText">我的分配</div>
      </van-grid-item>
    </van-grid>

  </div>
</template>

<script>
  import {fetchPost} from "../https";

  export default {
    name: "Home",
    data() {
      return {
        indexImg:require('../assets/images/tu-1.png'),
        NotReplyCount:"",
        NotProcessCount:"",
        AllCount:"",

      };
    },
    methods:{
      getData(){
        let that=this;
        that.fetchPost("restApi/mobile/index",{}).then((res)=>{
          console.log(res);
          that.NotReplyCount=res.data.data.NotReplyCount;
          that.NotProcessCount=res.data.data.NotProcessCount;
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
  .gridBox{
    height: 172px;
  }
  .indexImg{
    width: 100%;
    /*height: 320px;*/
  }
  .navBox >>> .van-ellipsis{
    font-weight: 600;
    font-size: 20px;
  }
  .van-cell{
    box-sizing: unset;
  }
  .swipImg{
    /*width: 100%;*/
    height: 350px;
  }
  .icon-woderenwu{

    font-size: 0.8rem;
    color: #ff0000;
  }
  .myDistribution{
    font-size: 24px;
    line-height: 62px;
    color: #5c5c5c;
    /*background-color: #cccccc;*/
    padding: 0 30px;
  }
  .textNumber{
    font-size: 34px;
    color: #d51927;
  }
  .gardText{
    margin-top: 10px;
    font-size: 20px;
    color: #5c5c5c;
  }
</style>
<style>
  .van-grid-item__content::after{
    border-width: 0 2px 1px 0;
  }
</style>
