<template>
  <div>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" class="swipImg"/>
      </van-swipe-item>
    </van-swipe>
    <van-grid :gutter="10">
      <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="文字" @click="toFeipei"/>
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
      toFeipei(){
        this.$router.push({
          name:"Feipei"
        })
      }
    }
  }
</script>

<style scoped>
  .swipImg{
    width: 100%;
  }
</style>
