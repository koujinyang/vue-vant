<template>
  <div class="home">
<!--    <img src="../assets/images/homeActive.png" alt="">-->

    <transition :name="transitionName">
        <router-view class="Router"/>
    </transition>
    <van-tabbar v-model="active" fixed placeholder  safe-area-inset-bottom>
      <van-tabbar-item name="home" to="home" :icon="active=='home'?icon.homeActive:icon.home">
        <span class="menuText">首页</span>
      </van-tabbar-item>
      <van-tabbar-item name="work" to="work" :icon="active=='work'?icon.workActive:icon.work">
<!--             <van-icon class="iconfont" class-prefix="icon" slot="icon" name="caidan"></vn-icon>-->
        <span class="menuText">工作台</span>
      </van-tabbar-item>
      <van-tabbar-item name="my" to="my" :icon="active=='my'?icon.ourActiv:icon.our">
        <span class="menuText">我的</span>
      </van-tabbar-item>
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
          homeActive:require('../assets/images/homeActive.png'),
          home:require('../assets/images/home.png'),
          workActive:require('../assets/images/menuActive.png'),
          work:require('../assets/images/menu.png'),
          ourActiv:require('../assets/images/ourActive.png'),
          our:require('../assets/images/our.png'),
        },
        transitionName: 'slide-right', //初始过渡动画方向
      }

    },
    methods:{
      // onChange(index) {
      // Notify({ type: 'primary', message: index });
      // console.log(index);
      // this.$router.push(index)
      // },
    },
    mounted() {
      console.log(this.$route.path);
      this.active=this.$route.path.replace("/","");
    },
    watch: {
      $route(to, from) {
        // 切换动画
        let isBack = this.$router.isBack // 监听路由变化时的状态为前进还是后退
        if (isBack) {
          this.transitionName = 'slide-left'
        } else {
          this.transitionName = 'slide-right'
        }
        this.$router.isBack = false
      }
    },
    components: {
      // HelloWorld,

    }
  };
</script>
<style scoped>
  .menuText{
    font-size: 0.2133rem;
    color: #989898;
  }
  .van-tabbar-item--active .menuText{
    color: #5c5c5c;
  }
  .Router {
    position: absolute;
    height: 100%;
    width: 100%;
    transition: all .377s ease;
    /*will-change: transform;*/
    top: 0;
    backface-visibility: hidden;
    /*perspective: 1000;*/
  }
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    transform: translate3d(100%, 0 ,0);
  }

  .van-tabbar-item >>> .icon-caidan{
    font-size: 0.8rem;
  }
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
