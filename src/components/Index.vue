<template>
  <div class="home">
<!--    <img src="../assets/images/homeActive.png" alt="">-->
    <router-view />
    <van-tabbar v-model="active" fixed active-color="#f00">
      <van-tabbar-item name="home" to="home" :icon="active=='home'?'wap-home':'wap-home-o'">首页</van-tabbar-item>
            <van-tabbar-item name="friends" :icon="active=='friends'?'wap-home-o':'wap-home'">工作台</van-tabbar-item>
      <van-tabbar-item name="our" to="our" :icon="active=='our'?icon.ourActiv:icon.our">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data(){
      return{
        // route:true,
        active: 'home',
        icon:{
          homeActive:'../assets/images/homeActive.png',
          home:'../assets/images/home.png',
          ourActiv:require('../assets/images/ourActive.png'),
          our:require('../assets/images/our.png'),
        }
      }

    },
    methods:{
      // onChange(index) {
      // Notify({ type: 'primary', message: index });
      // console.log(index);
      // this.$router.push(index)
      // },
    },
    components: {
      // HelloWorld,

    }
  };
</script>
<style scoped>
  .van-tabbar-item{
    font-size: 14px;
  }
  .van-tabbar-item >>> .van-tabbar-item__icon{
    font-size: 30px;
    margin-bottom: 0;
  }
  .van-tabbar-item >>>.van-tabbar-item__icon img{
    height: 30px;
  }
  .van-tabbar{
    background: #b7bbbf;
  }
</style>
