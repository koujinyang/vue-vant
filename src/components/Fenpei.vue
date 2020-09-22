<template>
    <div>
      <van-nav-bar fixed placeholder  title="我的分配" left-arrow  @click-left="onClickLeft"
                   @click-right="onClickRight" class="navBox">
        <template #right>
<!--          <van-icon name="search" size="18" />-->
          <van-icon class="iconfont" class-prefix="icon"  name="loudou" size="18" ></van-icon>
        </template>
      </van-nav-bar>
      <van-search
        v-model="phoneNumber"
        placeholder="手机号"
        input-align="center"
        shape="round"

        class="searchBox"
        @input="numValid('phoneNumber')"
        @search="searchByNumber"
      />
      <van-popup v-model="show" class="rightPopupBox" position="right"  :style="{ width: '70%',height: '100%' }" >
        <div class="rightTittle">高级查询</div>
        <van-field v-model="areaName" type="text" label="省份"  placeholder="选择省份" readonly @click="chooseArea"/>
        <van-field v-model="AnYuanHao" type="text" label="案源号"  placeholder="输入案源号"/>
        <!-- 输入手机号，调起手机号键盘 -->
        <van-field v-model="userName" type="text" label="客户姓名"   placeholder="输入客户姓名"/>
        <!-- 允许输入正整数，调起纯数字键盘 -->
        <van-field v-model="phoneNumber" type="number" label="联系电话"   placeholder="输入联系电话"/>
        <!-- 允许输入数字，调起带符号的纯数字键盘 -->
        <van-field v-model="allocation" type="text" label="分配人员"   placeholder="输入人员分配"/>
        <!-- 输入密码 -->
        <van-field v-model="auxiliary" type="text" label="辅办人员"   placeholder="输入辅办人员"/>
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
          <van-col span="12"><van-button type="default" size="large" @click="reset">重置</van-button></van-col>
          <van-col span="12"><van-button type="info" size="large" color="#c30000" @click="save">确认</van-button></van-col>
        </van-row>
      </van-popup>
      <!--    <van-area title="选择省份" :area-list="areaList" value="110000" :columns-num="1" />-->
      <van-popup
        v-model="showArea"
        position="bottom"
        :style="{ height: '50%' }">
        <van-area :area-list="areaList" :columns-num="1"  :columns-placeholder="['请选择']"   value="110000" ref="myArea"  title="选择省份" @confirm="onConfirm" @cancel="onCancel">
<!--          <template #columns-top>-->
<!--            <div>jjjjj</div>-->
<!--          </template>-->
        </van-area>
      </van-popup>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :disabled="pullDown">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多数据了"
          @load="onLoad"
        >
          <!--          <div v-if="list.length==0" class="noMessage">无数据</div>-->
          <van-checkbox-group v-model="result">
            <van-cell-group class="fenpeiListBox1">
              <van-cell
                v-for="(item, index) in list"
                clickable
                :key="item.id"
                :title=" item.name"
                center
                class="fenpeiListBox"
              >
                <template #title>
                  <div class="fenpeiListTitle">{{item.name}}</div>
                </template>
                <template #label>
                  <div >
                    <van-field @click="toAnyuan(item.id)"  v-model="item.AnYuanHao"  label-width="3rem" label="案源号：" input-align="right" readonly/>
                    <van-field  v-model="item.phoneNumber"  label-width="3rem" label="主联系电话：" input-align="right" readonly>
                      <template #input>
                        <a :href="'tel:' + item.phoneNumber" class="telBox">{{item.phoneNumber+"(点击呼出)"}}</a>
                      </template>
                    </van-field>
                    <van-field @click="toAnyuan(item.id)"  v-model="item.rovince"  label-width="3rem" label="省份：" input-align="right" readonly/>
                    <van-field @click="toAnyuan(item.id)"  v-model="item.userArea"  label-width="3rem" label="客户区域：" input-align="right" readonly/>
                    <van-field @click="toAnyuan(item.id)"  v-model="item.allocation"  label-width="3rem" label="分配人员：" input-align="right" readonly/>
                    <van-field @click="toAnyuan(item.id)"  v-model="item.auxiliary"  label-width="3rem" label="辅办人员：" input-align="right" readonly/>
                  </div>
                  <div class="setFuban" v-show="result.length==0&&item.mainLawyer"><van-button color="#d51927"  size="small"   @click.stop.prevent="choosePerson(item.id)">设置辅办</van-button></div>
                </template>
                <template #icon >
                  <van-checkbox :name="item.id" ref="checkboxes" checked-color="#d50927"   @click="choosePersons"/>
                </template>
                <!--                <template #right-icon >-->
                <!--                  <van-icon name="arrow"  @click="toAnyuan(item.id)"></van-icon>-->
                <!--                </template>-->
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </van-list>
      </van-pull-refresh>
      <div class="setFuban1" v-show="result.length>0"><van-button color="#d51927"  size="small"    @click.stop.prevent="choosePerson1()">设置辅办</van-button></div>

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
            AnYuanHao:"",
            userName:"",
            gaoPhoneNumber:"",
            allocation:"",
            auxiliary:"",
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
            radioBox1State:0,
            page:0,//第几页
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
          console.log(this.areaName);
          this.showArea = false//关闭弹框
        },
        //取消选中城市
        onCancel() {
          this.showArea = false
          this.$refs.myArea.reset()// 重置城市列表
        },
        onLoad() {
          let that=this;
          that.page++;
          if (this.refreshing) {
            that.list = [];
            that.refreshing = false;
          }
          // 我的分配 1 ,待反馈 2,待处理 3 , 已签合同 4 ,今日分配 5 ,本月分配  6 ,全部数量 1
          var querytype;
          if(that.$route.params.id==1){
            querytype = "ALL"
          }else if(that.$route.params.id==2){
            querytype = "NotReply"
          }else if(that.$route.params.id==3){
            querytype = "NotProcess"
          }else if(that.$route.params.id==4){
            querytype = "IsContract"
          }else if(that.$route.params.id==5){
            querytype = "TodayAssign"
          }else if(that.$route.params.id==6){
            querytype = "MonthAssign"
          }
          var distributionStatus;
          if(that.radioBoxState==0){
            distributionStatus="";
          }else if(that.radioBoxState==1){
            distributionStatus="未反馈";
          }else if(that.radioBoxState==2){
            distributionStatus="有效";
          }else if(that.radioBoxState==3){
            distributionStatus="无效";
          }
          var data={};
          // if(!parmas){
          //   data={
          //     querytype:querytype
          //   }
          // }else {
          //   data=parmas;
          //   data.querytype=querytype;
          // }
          data.querytype=querytype;
          data.customerTel0=that.phoneNumber;
          data.cusotmerProvince=that.areaName;
          data.caseCode=that.AnYuanHao;
          data.customerName=that.userName;
          data.attorney=that.allocation;
          data.assistLawyer=that.auxiliary;
          data.distributionStatus=distributionStatus;
          var radioBox1State;
          if(that.radioBox1State==0){
            radioBox1State="";
          }else if(that.radioBox1State==1){
            radioBox1State=1;
          }else if(that.radioBox1State==2){
            radioBox1State=0;
          }
          data.assistState=radioBox1State;
          that.fetchPost("restApi/mobile/myassignlist",data,{limit:5,page:that.page}).then((res)=>{
            var dataList=res.data.data.data;
            if(that.page==1){
              that.list=[];
            }
            for (let i = 0; i < dataList.length; i++) {
              that.list.push({
                id:dataList[i].caseId,
                name:dataList[i].customerName,
                AnYuanHao:dataList[i].caseCode,
                phoneNumber:dataList[i].customerTel0,
                rovince:dataList[i].cusotmerProvince,
                userArea:dataList[i].cusotmerArea,
                allocation:dataList[i].distributionName,
                auxiliary:dataList[i].assistLawyer,
                mainLawyer:dataList[i].mainLawyer
              });
            }
            if (dataList.length == 0) {
              this.finished = true;
            }

            this.loading = false;
            // for (let i = 0; i < 10; i++) {
            //   this.list.push({
            //     id: this.list.length + 1,
            //     name: "张三",
            //     AnYuanHao: '2020082900000',
            //     phoneNumber: "15900000000",
            //     rovince: "北京",
            //     userArea: "海淀",
            //     allocation: "张三、李四",
            //     auxiliary: "王五"
            //   });
            // }
          }).catch()

        },
        onRefresh() {
          // 清空列表数据
          this.finished = false;

          // 重新加载数据
          // 将 loading 设置为 true，表示处于加载状态
          this.loading = true;
          // that.page++;
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
          var anyuanIds=this.result.toString().replace(/","/g,"&");
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
        },
        reset(){
          this.number="";
          this.areaName="";
          this.AnYuanHao="";
          this.userName="";
          this.phoneNumber="";
          this.allocation="";
          this.auxiliary="";
          this.radioBox1State=0;
          this.radioBoxState=0;
          this.page=0;
          this.show = false;
          this.onLoad();
        },
        save(){
          this.show = false;
          this.page=0;
          this.onLoad();
        },
        searchByNumber(value){
          console.log(value);
          // if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))){
          //   this.$toast('请输入正确手机号');
          //   // return false;
          // }

          this.page=0;
          this.onLoad();
        },
        numValid(value){
          this[value] =this[value].replace(/[^0-9]/g,'')
        }

      },
        mounted() {
          console.log(this.$route.params.id);
        }
    }
</script>

<style scoped>
  .fenpeiListBox1{
    background: none;
  }
  .fenpeiListBox{
    margin-bottom: 14px;
  }
  .telBox{
    font-size: 0.2666rem;
    color: #5c5c5c;
    text-decoration:underline;
  }
  .fenpeiListTitle{
    color: #5c5c5c;
    font-size: 24px;

  }
  .searchBox{
    background: #f9f9f9;
    height: 90px;
  }
  .searchBox >>> .van-search__content{
    height: 0.826rem;
    background-color: #ffffff;
  }
  .searchBox >>> .van-field__control{
    line-height: 0.826rem;
  }
  .searchBox >>> .van-icon-search{
    line-height: 0.826rem;
    font-weight: 600;
  }
  .noMessage{
    text-align: center;
    font-size: 18px;
    line-height: 50px;
  }
  .rightPopupBox .van-cell{
    padding: 10px 16px;
    font-size: 12px;
  }
  .navBox >>> .van-nav-bar__title{
    color: #5c5c5c;
    font-size: 20px;
    font-weight: 600;
  }

  .navBox >>>.van-icon-arrow-left{
    color: #5c5c5c;
  }
  .radioBox1{
    color: rgb(255, 255, 255);
    background: rgb(195, 0, 0);
    border-color: rgba(242, 242, 242, 1);
  }
  .radioBox{
    display: inline-block;
    padding: 5px;
    width: 100%;
    border: 1px solid #cccccc;

  }
  .setFuban{
    /*position: absolute;*/
    /*bottom: 0.5rem;*/
    /*right: 1rem;*/
    text-align: right;
  }
  .setFuban1{
    position: sticky;
    bottom: 0.5rem;
    right: 32px;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    text-align: right;
    padding-right: 32px;
  }
  .van-field{
    padding: 0 ;
  }
  .van-field::after{
    border: none;
  }
  .van-field >>> .van-cell__title{
    font-size: 0.2666rem;
    line-height: 0.7rem;
    color: #5c5c5c;
  }
  .van-field >>>.van-field__control{
    font-size: 0.2666rem;
    color: #5c5c5c;
  }
  .van-cell__title, .van-cell__value{
    margin-left: 15px;
  }
  .rightTittle{
    position: relative;
    text-align: center;
    font-size: 0.4rem;
    line-height: 1rem;
    color: #5c5c5c;
    /*border-bottom: 1px solid #cccccc;*/
  }
  .leftTittle{
    position: relative;
    font-size: 0.32rem;
    line-height: 0.93333rem;
    color: #5c5c5c;
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
