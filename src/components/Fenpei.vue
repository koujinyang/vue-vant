<template>
    <div>
      <van-nav-bar fixed placeholder  title="我的分配" left-text="返回" left-arrow  @click-left="onClickLeft"
                   @click-right="onClickRight">
        <template #right>
<!--          <van-icon name="search" size="18" />-->
          <van-icon class="iconfont" class-prefix="icon"  name="loudou" size="18" color="#1989fa"></van-icon>
        </template>
      </van-nav-bar>
      <van-search
        v-model="phoneNumber"
        placeholder="手机号"
        input-align="center"
      />
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
        <div class="leftTittle">反馈状态</div>
        <van-row gutter="20" style="text-align: center;padding: 0 16px ;">
          <van-col span="8">
            <span class="radioBox" :class="radioBoxState==1?'radioBox1':''" @click="changeState(1)" >未反馈</span>
          </van-col>
          <van-col span="8">
            <span class="radioBox" :class="radioBoxState==2?'radioBox1':''" @click="changeState(2)" >有效</span>
          </van-col>
          <van-col span="8">
            <span class="radioBox" :class="radioBoxState==3?'radioBox1':''" @click="changeState(3)" >无效</span>
          </van-col>
        </van-row>
        <div class="leftTittle">辅办状态</div>
        <van-row gutter="20" style="text-align: center;padding: 0 16px ;">
          <van-col span="8">
            <span class="radioBox" :class="radioBox1State==1?'radioBox1':''" @click="changeState1(1)" >已设置</span>
          </van-col>
          <van-col span="8">
            <span class="radioBox" :class="radioBox1State==2?'radioBox1':''" @click="changeState1(2)" >未设置</span>
          </van-col>
        </van-row>
        <van-row style="position: fixed;bottom: 0;width: 100%;">
          <van-col span="12"><van-button type="default" size="large">重置</van-button></van-col>
          <van-col span="12"><van-button type="info" size="large">确认</van-button></van-col>
        </van-row>
      </van-popup>
      <!--    <van-area title="选择省份" :area-list="areaList" value="110000" :columns-num="1" />-->
      <van-popup
        v-model="showArea"
        position="bottom"
        :style="{ height: '50%' }">
        <van-area :area-list="areaList" :columns-num="1"  value="110000" ref="myArea"  title="选择省份" @confirm="onConfirm" @cancel="onCancel"/>
      </van-popup>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :disabled="pullDown">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
<!--          <van-cell v-for="item in list" :key="item" :title="item" />-->
          <van-checkbox-group v-model="result">
            <van-cell-group>
<!--              <van-cell-->
<!--                v-for="(item, index) in list"-->
<!--                clickable-->
<!--                :key="item.id"-->
<!--                :title=" item.name"-->
<!--                is-link-->
<!--                center-->
<!--                :to="`/anyuan/${item.id}`"-->
<!--              >-->
              <van-cell
                v-for="(item, index) in list"
                clickable
                :key="item.id"
                :title=" item.name"
                is-link
                center
              >
                <template #label>
                  <div @click="toAnyuan(item.id)">
                    <div>案源号：{{item.AnYuanHao}}</div>
                    <div>主联系电话：{{item.phoneNumber}}</div>
                    <div>省份：{{item.rovince}}</div>
                    <div>客户区域：{{item.userArea}}</div>
                    <div>分配人员：{{item.allocation}}</div>
                    <div>辅办人员：{{item.auxiliary}}</div>
                  </div>
                  <div class="setFuban" v-show="result.length==0"><van-button color="#cccccc" round  plain @click.stop.prevent="choosePerson(item.id)">设置辅版</van-button></div>
                </template>
                <template #icon >
                  <van-checkbox :name="item.id" ref="checkboxes"   @click="choosePersons"/>
                </template>
                <template #right-icon >
                  <van-icon name="arrow"  @click="toAnyuan(item.id)"></van-icon>
                </template>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </van-list>
      </van-pull-refresh>
      <div class="setFuban1" v-show="result.length>0"><van-button color="#f00" round   @click.stop.prevent="choosePerson1()">设置辅版</van-button></div>

    </div>
</template>

<script>
    export default {
        name: "Fenpei",
      data(){
          return{
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
            },
            phoneNumber:"",
            list: [],
            result: [],
            loading: false,
            finished: false,
            refreshing: false,
            pullDown:true,
            radioBoxState:0,
            radioBox1State:0
          }
      },
    //  1、我的分配 2、待反馈 3、待处理 4、待设置辅办 5、已签合同 6、今日分配 7、本月分配 8、本年分配
      methods: {
        toAnyuan(id){
          console.log(id);
          this.$router.push({name:'Anyuan',params: {id:id}})
        },
        choosePersons(){
          console.log(this.result);
        },
        onClickRight() {
          this.show = true;
        },
        onClickLeft() {
          this.$router.go(-1)
        },

        chooseArea() {
          this.showArea = true;
        },
        //确定选择城市
        onConfirm(val) {
          this.areaName = val[0].name;
          this.showArea = false//关闭弹框
        },
        //取消选中城市
        onCancel() {
          this.showArea = false
          this.$refs.myArea.reset()// 重置城市列表
        },
        onLoad() {
          setTimeout(() => {
            if (this.refreshing) {
              this.list = [];
              this.refreshing = false;
            }

            for (let i = 0; i < 10; i++) {
              this.list.push({
                id:this.list.length+1,
                name:"张三",
                AnYuanHao:'2020082900000',
                phoneNumber:"15900000000",
                rovince:"北京",
                userArea:"海淀",
                allocation:"张三、李四",
                auxiliary:"王五"

              });
            }
            this.loading = false;

            if (this.list.length >= 40) {
              this.finished = true;
            }
          }, 1000);
        },
        onRefresh() {
          // 清空列表数据
          this.finished = false;

          // 重新加载数据
          // 将 loading 设置为 true，表示处于加载状态
          this.loading = true;
          this.onLoad();
        },
        toggle(index) {
          // this.$refs.checkboxes[index].toggle();
        },
        choosePerson(id){
          this.$router.push({
            path: `/setfuban/${id}`,
          })
        },
        choosePerson1(){
          var anyuanIds=this.result.toString().replace(",","&");
          this.$router.push({
            path: `/setfuban/${anyuanIds}`,
          })
        },
        changeState(index){
          if(this.radioBoxState==index){
            this.radioBoxState=0;
          }else {
            this.radioBoxState=index;

          }
        },
        changeState1(index){
          if(this.radioBox1State==index){
            this.radioBox1State=0;
          }else {
            this.radioBox1State=index;

          }
        }
      },
        mounted() {
          console.log(this.$route.params.id);
        }
    }
</script>

<style scoped>
  .radioBox1{
    background-color: rgba(255, 51, 0, 1);
    border-color: rgba(242, 242, 242, 1);
  }
  .radioBox{
    display: inline-block;
    padding: 5px;
    width: 100%;
    border: 1px solid #cccccc;

  }
  .setFuban{
    position: absolute;
    bottom: 0.5rem;
    right: 1.5rem;
  }
  .setFuban1{
    position: fixed;
    bottom: 0.5rem;
    right: 1.5rem;
  }
  .van-cell__title, .van-cell__value{
    margin-left: 15px;
  }
  .rightTittle{
    position: relative;
    text-align: center;
    font-size: 0.4rem;
    line-height: 1rem;
    /*border-bottom: 1px solid #cccccc;*/
  }
  .leftTittle{
    position: relative;
    font-size: 0.4rem;
    line-height: 1rem;
    padding-left: 32px;
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
