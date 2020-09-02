<template>
  <div>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images"  :key="index">
        <img v-lazy="image" class="swipImg"/>
      </van-swipe-item>
    </van-swipe>
    <van-grid :gutter="10">
      <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="文字" @click="toFeipei"/>
    </van-grid>
    <van-popup v-model="show" position="right" :style="{ width: '70%',height: '100%' }" >
      <div class="rightTittle">高级查询</div>
      <van-field v-model="areaName" type="text" label="省份"  placeholder="选择省份" @focus="chooseArea"/>
      <van-field v-model="number" type="text" label="案源号"  placeholder="输入案源号"/>
      <!-- 输入手机号，调起手机号键盘 -->
      <van-field v-model="number" type="text" label="客户姓名"   placeholder="输入客户姓名"/>
      <!-- 允许输入正整数，调起纯数字键盘 -->
      <van-field v-model="number" type="number" label="联系电话"   placeholder="输入联系电话"/>
      <!-- 允许输入数字，调起带符号的纯数字键盘 -->
      <van-field v-model="number" type="text" label="人员分配"   placeholder="输入人员分配"/>
      <!-- 输入密码 -->
      <van-field v-model="number" type="text" label="辅办人员"   placeholder="输入辅办人员"/>
    </van-popup>
<!--    <van-area title="选择省份" :area-list="areaList" value="110000" :columns-num="1" />-->
    <van-popup
      v-model="showArea"
      position="bottom"
      :style="{ height: '50%' }">
      <van-area :area-list="areaList" :columns-num="1"  value="110000" ref="myArea"  title="选择省份" @confirm="onConfirm" @cancel="onCancel"/>
    </van-popup>
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
        show: false,
        showArea:false,
        areaName:"",
        number:"",
        areaList:{
          province_list: {
            110000: '北京市',
            120000: '天津市',
            130000: '河北省',
            140000: '山西省',
            150000: '内蒙古自治区',
            210000: '辽宁省',
            220000: '吉林省',
            230000: '黑龙江省',
            310000: '上海市',
            320000: '江苏省',
            330000: '浙江省',
            340000: '安徽省',
            350000: '福建省',
            360000: '江西省',
            370000: '山东省',
            410000: '河南省',
            420000: '湖北省',
            430000: '湖南省',
            440000: '广东省',
            450000: '广西壮族自治区',
            460000: '海南省',
            500000: '重庆市',
            510000: '四川省',
            520000: '贵州省',
            530000: '云南省',
            540000: '西藏自治区',
            610000: '陕西省',
            620000: '甘肃省',
            630000: '青海省',
            640000: '宁夏回族自治区',
            650000: '新疆维吾尔自治区',
            710000: '台湾省',
            810000: '香港特别行政区',
            820000: '澳门特别行政区',
            900000: '海外',
          },
        }

      };
    },
    methods:{
      toFeipei(){
        // this.$router.push({
        //   name:"Feipei"
        // })
        this.show = true;
      },
      chooseArea(){
        this.showArea=true;
      },
      //确定选择城市
      onConfirm(val){
        this.areaName=val[0].name;
        this.showArea = false//关闭弹框
      },
      //取消选中城市
      onCancel(){
        this.showArea = false
        this.$refs.myArea.reset()// 重置城市列表
      }
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
  .rightTittle{
    position: relative;
    text-align: center;
    font-size: 0.4rem;
    line-height: 1rem;
    /*border-bottom: 1px solid #cccccc;*/
  }
  .rightTittle::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 16px;
    bottom: 0;
    left: 16px;
    border-bottom: 1px solid #ebedf0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
  }
</style>
