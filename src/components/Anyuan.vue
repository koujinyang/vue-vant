<template>
    <div >
      <van-nav-bar
        title="案源信息"
        fixed
        placeholder
        left-arrow
        @click-left="onClickLeft"
        class="navBox"
      />
      <van-form >
        <div class="formTittle">基础信息</div>
        <div class="textareaBoxTittle">案情介绍：</div>
        <van-field
          v-model="anyuanData.AnYuanJieShao"
          autosize
          label=""
          class="textareaBox noBottom"
          type="textarea"
          placeholder="请输入案情介绍"
          colon
          border
          readonly
        />
        <van-field
          v-model="anyuanData.AnYuanHao"
          label="案源号："
          readonly
          input-align="right"
          class="noBottom"
        >
          <template #label>
            <span class="anyuanLabel">案源号:</span>
          </template>
          <template #input>
            <span class="anyuanLabel">{{anyuanData.AnYuanHao}}</span>
          </template>
        </van-field>
        <van-field
          v-model="anyuanData.name"
          label="客户名称："
          readonly
          input-align="right"
          class="noBottom"
        >
          <template #label>
            <span class="anyuanLabel">客户名称:</span>
          </template>
          <template #input>
            <span class="anyuanLabel">{{anyuanData.name}}</span>
          </template>
        </van-field>
        <van-field
          v-model="anyuanData.phoneNumber"
          label="主联系电话："
          readonly
          input-align="right"
          class="noBottom"
        >
          <template #label>
            <span class="anyuanLabel">主联系电话:</span>
          </template>
          <template #input>
            <a :href="'tel:' + anyuanData.phoneNumber" class="telBox">{{anyuanData.phoneNumber+"(点击呼出)"}}</a>
          </template>
        </van-field>
        <van-field
          v-model="anyuanData.AnYanType"
          label="案源类型："
          readonly
          input-align="right"
          class="noBottom"
        >
          <template #label>
            <span class="anyuanLabel">案源类型:</span>
          </template>
          <template #input>
            <span class="anyuanLabel">{{anyuanData.AnYanType}}</span>
          </template>
        </van-field>
        <van-field
          v-model="anyuanData.rovince"
          label="省份："
          readonly
          input-align="right"
          class="noBottom"
        >
          <template #label>
            <span class="anyuanLabel">省份:</span>
          </template>
          <template #input>
            <span class="anyuanLabel">{{anyuanData.rovince}}</span>
          </template>
        </van-field>
        <van-field
          v-model="anyuanData.userArea"
          label="客户地区："
          readonly
          input-align="right"
          class="noBottom"
        >
          <template #label>
            <span class="anyuanLabel">客户地区:</span>
          </template>
          <template #input>
            <span class="anyuanLabel">{{anyuanData.userArea}}</span>
          </template>
        </van-field>
        <van-field
          v-model="anyuanData.allocation"
          label="分配人员："
          readonly
          input-align="right"
          class="noBottom"
        >
        <template #label>
          <span class="anyuanLabel">分配人员:</span>
        </template>
        <template #input>
          <span class="anyuanLabel">{{anyuanData.allocation}}</span>
        </template>
        </van-field>
        <van-field
          v-model="anyuanData.auxiliary"
          label="辅办人员："
          readonly
          input-align="right"
          class="noBottom latsField"

        >
          <template #label>
            <span class="anyuanLabel">辅办人员:</span>
          </template>
          <template #input>
            <span class="anyuanLabel">{{anyuanData.auxiliary}}</span>
          </template>
        </van-field>
<!--        <div style="margin: 16px;">-->
<!--          <van-button round block type="info" native-type="submit">-->
<!--            提交-->
<!--          </van-button>-->
<!--        </div>-->
      </van-form>
      <van-form class="centerForm">
        <van-field
          readonly
          clickable
          label="反馈状态："
          :value="value"
          placeholder="请选择"
          right-icon="arrow"
          class="noBottom"
          @click="showPicker = true"
        ><template #label>
          <span class="anyuanLabel">反馈状态:</span>
        </template>
        </van-field>
        <van-popup v-model="showPicker" get-container="#app" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
        <van-field
          v-model="genJinXinXi"
          rows="5"
          autosize
          type="textarea"
          placeholder="请输入跟进信息"
          colon
          maxlength="500"
          show-word-limit
          class="textareaBox textareaBox1 noBottom"
          style=""
        />
        <div style="text-align: center;clear: both">
          <van-button color="#d51927"  size="small"  native-type="submit" @click="saveGenjin">
            保存
          </van-button>
          <van-button color="#d51927" size="small" style="margin-left: 1rem"  native-type="submit" @click="resteGenjin">
            取消
          </van-button>
        </div>
      </van-form>
      <van-cell-group class="genjinBox">
<!--        <div class="formTittle">跟进信息</div>-->
        <van-cell class="genjinBox1" title="跟进信息" title-class="genjinTitle1"/>
        <van-cell class="genjinBox1" v-for="(item, index) in genjinData" :key="item.id" :title="item.name +' '+item.time" :value="item.type" :label="item.message" >
          <template #title>
            <span class="genjinTitle">{{item.name+' '+item.time}}</span>
          </template>
          <template #label>
            <span class="genjinLabel">{{item.message}}</span>
          </template>
          <template #default>
            <span class="genjinDefault">{{item.type}}</span>
          </template>
        </van-cell>
        <div v-if="genjinData.length==0" class="noGenjin">暂无跟进信息</div>
      </van-cell-group>
    </div>
</template>

<script>
    import {methods} from "babel-plugin-transform-runtime";

    export default {
        name: "Anyuan",
      data(){
        return{
          anyuanData:{
            id:1,
            name:"张三",
            AnYuanHao:'2020082900000',
            AnYuanJieShao:"案源介绍,安源介绍",
            AnYanType:'A',
            phoneNumber:"15900000000",
            rovince:"北京",
            userArea:"海淀",
            allocation:"张三律师",
            auxiliary:"李四助理"
          },
          value: '',
          showPicker: false,
          columns: ['未反馈', '有效', '无效'],
          genJinXinXi:"",
          genjinData:[
          //   {
          //   id:1,
          //   name:"张三",
          //   time:"2020-01-01 09:00",
          //   type:"无效",
          //   message:"跟客户初始沟通，取得客户信息人。湘绣俩姐了撒旦艰苦拉萨决定离开洒家的雷克萨 的空间洒家打开了就撒开道路浇洒利空打击"
          // },{
          //   id:2,
          //   name:"李四",
          //   time:"2020-01-01 09:00",
          //   type:"无效",
          //   message:"跟客户初始沟通，取得客户信息人。湘绣俩姐了撒旦艰苦拉萨决定离开洒家的雷克萨 的空间洒家打开了就撒开道路浇洒利空打击"
          // }
          ]
      }
      },
      methods:{
        getAnyuanData(){
          let that=this;
          that.fetchPost("restApi/mobile/detail",{caseId:this.$route.params.id}).then((res)=>{
            that.anyuanData.AnYuanJieShao=res.data.data.data.details;//案源介绍无
            that.anyuanData.id=res.data.data.data.caseId; //案源id
            that.anyuanData.AnYuanHao=res.data.data.data.caseCode; //案源号
            that.anyuanData.name=res.data.data.data.customerName; //客户姓名
            that.anyuanData.phoneNumber=res.data.data.data.customerTel0; //主联系电话
            that.anyuanData.AnYanType=res.data.data.data.caseDict; //案源类型 无
            that.anyuanData.rovince=res.data.data.data.cusotmerProvince; //省份 无
            that.anyuanData.userArea=res.data.data.data.cusotmerArea; //客户地区
            that.anyuanData.allocation=res.data.data.data.distributionName; //客户地区
            that.anyuanData.allocation=res.data.data.data.distributionLawyers; //分配人员
            that.anyuanData.auxiliary=res.data.data.data.assistLawyernames; //辅办人员

            // anyuanData:{
            //   id:1,
            //     name:"张三",
            //     AnYuanHao:'2020082900000',
            //     AnYuanJieShao:"案源介绍,安源介绍",
            //     AnYanType:'A',
            //     phoneNumber:"15900000000",
            //     rovince:"北京",
            //     userArea:"海淀",
            //     allocation:"张三律师",
            //     auxiliary:"李四助理"
            // }
          }).catch(

          )
        },
        getGebjinData(){

          let that=this;
          that.fetchPost("restApi/mobile/followList",{caseId:this.$route.params.id},{limit:50,page:1}).then((res)=> {
            console.log(res);
            var dataList=res.data.data.data;
            console.log(dataList);
            that.genjinData=[];
            for(var i=0;i<dataList.length;i++){
              that.genjinData.push({
                id:dataList[i].caseId,
                name:dataList[i].createName,
                time:dataList[i].createTime,
                type:dataList[i].feedbackStatus,
                message:dataList[i].remarks
              })
            }
          }).catch(

          )
        },
        saveGenjin(){
          var that=this;

          if(that.value == ''){
            this.$toast("请选择反馈状态");
            return ;
          }
          if(that.genJinXinXi == ''){
            this.$toast("跟进信息不能为空");
            return ;
          }
          that.fetchPost("restApi/mobile/addfollow",{caseId:this.$route.params.id,remarks:that.genJinXinXi,feedbackStatus:that.value}).then((res)=>{
            if(res.data.code==200){
              that.$toast("添加跟进成功");
              that.value="";
              that.genJinXinXi="";
              that.getGebjinData();
            }else {
              this.$toast(res.data.message);
            }
          }).catch(

          )
        },
        resteGenjin(){
          this.value="";
          this.genJinXinXi="";

        },
        onClickLeft() {
          this.$router.go(-1)
        },
        onConfirm(value) {
          this.value = value;
          console.log(value);
          this.showPicker = false;
        },
      },
      mounted() {
        console.log(this.$route.params.id);
        this.getAnyuanData();
        this.getGebjinData();
      }
    }
</script>

<style scoped>
  .noGenjin{
    text-align: center;
    font-size: 20px;
    line-height: 40px;
  }
  .genjinTitle,.genjinLabel,.genjinDefault{
    font-size: 20px;
    color: #5c5c5c;
  }
  .genjinDefault{
    /*position: absolute;*/
    /*right: 30px;*/
    /*width: 80px;*/
    /*text-align: right;*/
  }
  .genjinTitle1{
    font-size: 24px;
    color: #5c5c5c;
  }
  .genjinBox1{
    padding: 20px 30px;
    position: relative;
  }
  .centerForm{
    margin-top: 16px;
    margin-bottom: 16px;
    background-color: #ffffff;
    padding-bottom: 32px;
  }
  .latsField{
    padding-bottom: 30px !important;
  }

  .telBox{
    font-size: 0.2666rem;
    color: #5c5c5c;
    text-decoration:underline;
  }
  .anyuanLabel{
    font-size: 20px;
    color: #5c5c5c;
  }
  .noBottom::after{
    border: none;
  }
  .noBottom{
    padding: 10px 32px;
  }
  .van-button--small{
    padding: 0 15px;
  }
  .navBox >>> .van-nav-bar__title{
    color: #5c5c5c;
    font-size: 0.2667rem;
    font-weight: 600;
  }
  .navBox >>>.van-icon-arrow-left{
    color: #5c5c5c;
  }
  .genjinBox >>> .van-cell__title, .van-cell__value{
    -webkit-box-flex: auto;
    -webkit-flex: auto;
    flex: auto;
  }
  .genjinBox >>> .van-cell__value{
    /*position: absolute;*/
    /*!*width: 80px;*!*/
    /*width: 1.06rem;*/
    /*height: 40px;*/
    /*right: 40px;*/
    /*text-align: right;*/
  }
  .van-form{
    /*background-color: #ffffff;*/
  }
  .textareaBoxTittle{
    background-color: #ffffff;
    font-size: 20px;
    line-height: 70px;
    padding-left: 32px;
  }
  .textareaBox{
    padding: 0 32px 60px 32px;
  }
  .textareaBox1{
    padding: 0 32px 32px 32px;
  }
  .textareaBox >>> textarea{
    border: 1px solid #ebedf0;
    padding: 10px;
    border-radius: 10px;
    height: 168px;
  }
.formTittle{
  font-size: 24px;
  line-height: 70px;
  color: #5c5c5c;
  /*background-color: #cccccc;*/
  padding: 0 30px;
}
</style>
