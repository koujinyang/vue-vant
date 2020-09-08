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
    <van-grid-item    @click="toFeipei(2)">
      <div class="textNumber">15</div>
      <div>待反馈</div>
    </van-grid-item>
    <van-grid-item   @click="toFeipei(4)">
      <div class="textNumber">10</div>
      <div>待设置辅办</div>
    </van-grid-item>
    <van-grid-item   @click="toFeipei(5)">
      <div class="textNumber">10</div>
      <div>已签合同</div>
    </van-grid-item>
    <van-grid-item   @click="toFeipei(6)">
      <div class="textNumber">10</div>
      <div>今日分配</div>
    </van-grid-item>
    <van-grid-item   @click="toFeipei(7)">
      <div class="textNumber">10</div>
      <div>本月分配</div>
    </van-grid-item>
    <van-grid-item   @click="toFeipei(8)">
      <div class="textNumber">10</div>
      <div>本年分配</div>
    </van-grid-item>
<!--    <van-grid-item  text="我的分配" @click="toFeipei">-->
<!--      <van-icon class="iconfont" class-prefix="icon" slot="icon" name="woderenwu"></van-icon>-->
<!--    </van-grid-item>-->
  </van-grid>

  <div class="myDistribution">我的台账</div>

  <van-grid :column-num='3'>
    <van-grid-item    >
      <div class="textNumber">15,000</div>
      <div>代开票金额</div>
    </van-grid-item>
    <van-grid-item   >
      <div class="textNumber">15,000</div>
      <div>本月收入</div>
    </van-grid-item>
<!--    <van-grid-item    @click="toFeipei">-->
<!--      <div class="textNumber">15,000</div>-->
<!--      <div>敬请期待</div>-->
<!--    </van-grid-item>-->

        <van-grid-item  text="敬请期待">
          <van-icon class="iconfont" class-prefix="icon" slot="icon" name="ziyuanldpi"></van-icon>
        </van-grid-item>
  </van-grid>
</div>
</template>

<script>
    export default {
        name: "Work",
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

  .navBox >>> .van-ellipsis{
    font-weight: 600;
    font-size: 20px;
  }
  .myDistribution{
    font-size: 0.55rem;
    line-height: 1.2rem;
    /*background-color: #cccccc;*/
    padding: 0 0.2rem;
  }

  .textNumber{
    font-size: 0.8rem;
    color: #ff0000;
  }
  .icon-ziyuanldpi{

    font-size: 0.8rem;
    color: #ff0000;
  }
</style>
