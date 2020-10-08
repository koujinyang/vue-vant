<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
<!--    <img src="./assets/images/our.png">-->
<!--    <router-view/>-->
    <transition :name="transitionName">
        <router-view class="Router" ></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      transitionName: 'slide-right', //初始过渡动画方向
    }
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
  }
}
</script>

<style>
  html,body{
    height: 100%;
    background-color: #f9f9f9;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #969799;
  height: 100%;
  width: 100%;
  position: relative;
}
  .Router {
    position: absolute;
    height: 100%;
    transition: all .377s ease;
    /*will-change: transform;*/
    top: 0;
    backface-visibility: hidden;
    /*perspective: 1000;*/
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
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
  textarea{
    -webkit-appearance: none;
  }
</style>
