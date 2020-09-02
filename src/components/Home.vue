<template>
  <div>

<!--    <van-swipe :autoplay="3000">-->
<!--      <van-swipe-item v-for="(image, index) in images" :key="index">-->
<!--        <img v-lazy="image" class="swipImg"/>-->
<!--      </van-swipe-item>-->
<!--    </van-swipe>-->
    <van-image
      width="100%"
      lazy-load
      src="https://img.yzcdn.cn/vant/apple-1.jpg"
    />
      <div class="myDistribution">我的分配</div>

    <van-grid :column-num='3'>
      <van-grid-item    @click="toFeipei(2)">
        <div class="textNumber">15</div>
        <div>待反馈</div>
      </van-grid-item>
      <van-grid-item   @click="toFeipei(3)">
        <div class="textNumber">10</div>
        <div>待处理</div>
      </van-grid-item>
      <van-grid-item  text="我的分配" @click="toFeipei(1)">
        <van-icon class="iconfont" class-prefix="icon" slot="icon" name="woderenwu"></van-icon>
      </van-grid-item>
    </van-grid>

  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg',
        ],

      };
    },
    methods:{
      toFeipei(id){
        this.$router.push({
          path: `/Fenpei/${id}`,
        })
      },
    }
  }
</script>

<style scoped>
  .van-cell{
    box-sizing: unset;
  }
  .swipImg{
    /*width: 100%;*/
    height: 350px;
  }
  .icon-woderenwu{

    font-size: 0.8rem;
    color: #cccccc;
  }
  .myDistribution{
    font-size: 0.55rem;
    line-height: 1rem;
    /*background-color: #cccccc;*/
    padding: 0 0.2rem;
  }
  .textNumber{
    font-size: 0.8rem;
    color: #cccccc;
  }
</style>
