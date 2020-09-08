<template>
    <div>
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
          rows="3"
          autosize
          label=""

          class="textareaBox"
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
        />
        <van-field
          v-model="anyuanData.name"
          label="客户名称："
          readonly
          input-align="right"
        />
        <van-field
          v-model="anyuanData.phoneNumber"
          label="主联系电话："
          readonly
          input-align="right"
        />
        <van-field
          v-model="anyuanData.AnYanType"
          label="案源类型："
          readonly
          input-align="right"
        />
        <van-field
          v-model="anyuanData.rovince"
          label="省份："
          readonly
          input-align="right"
        />
        <van-field
          v-model="anyuanData.userArea"
          label="客户地区："
          readonly
          input-align="right"
        />
        <van-field
          v-model="anyuanData.allocation"
          label="分配人员："
          readonly
          input-align="right"
        />
        <van-field
          v-model="anyuanData.auxiliary"
          label="辅办人员："
          readonly
          input-align="right"
        />
<!--        <div style="margin: 16px;">-->
<!--          <van-button round block type="info" native-type="submit">-->
<!--            提交-->
<!--          </van-button>-->
<!--        </div>-->
      </van-form>
      <van-form style="margin: 20px 0;padding: 10px 0;">
        <van-field
          readonly
          clickable
          label="反馈状态："
          :value="value"
          placeholder="请选择"
          right-icon="arrow"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" round position="bottom">
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
          class="textareaBox"
          style=""
        />
        <div style="text-align: center;clear: both">
          <van-button color="#c30000"  size="small"  native-type="submit">
            保存
          </van-button>
          <van-button color="#c30000" size="small" style="margin-left: 1rem"  native-type="submit">
            取消
          </van-button>
        </div>
      </van-form>
      <van-cell-group class="genjinBox">
        <van-cell title="跟进信息"  style="font-size: 0.45rem;"/>
        <van-cell  v-for="(item, index) in genjinData" :key="item.id" :title="item.name +' '+item.time" :value="item.type" :label="item.message" />
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
          genjinData:[{
            id:1,
            name:"张三",
            time:"2020-01-01 09:00",
            type:"无效",
            message:"跟客户初始沟通，取得客户信息人。湘绣俩姐了撒旦艰苦拉萨决定离开洒家的雷克萨 的空间洒家打开了就撒开道路浇洒利空打击"
          },{
            id:2,
            name:"李四",
            time:"2020-01-01 09:00",
            type:"无效",
            message:"跟客户初始沟通，取得客户信息人。湘绣俩姐了撒旦艰苦拉萨决定离开洒家的雷克萨 的空间洒家打开了就撒开道路浇洒利空打击"
          }]
      }
      },
      methods:{
        onClickLeft() {
          this.$router.go(-1)
        },
        onConfirm(value) {
          this.value = value;
          this.showPicker = false;
        },
      },
      mounted() {
        console.log(this.$route.params.id);
      }
    }
</script>

<style scoped>
  .van-button--small{
    padding: 0 15px;
  }
  .navBox >>>.van-nav-bar__text{
    color: #000000;
  }
  .navBox >>>.van-icon-arrow-left{
    color: #000000;
  }
  .genjinBox >>> .van-cell__title, .van-cell__value{
    -webkit-box-flex: auto;
    -webkit-flex: auto;
    flex: auto;
  }
  .genjinBox >>> .van-cell__value{
    width: 80px;
  }
  .van-form{
    background-color: #ffffff;
  }
  .textareaBoxTittle{
    background-color: #ffffff;
    font-size: 0.4rem;
    line-height: 0.7rem;
    padding-left: 32px;
  }
  .textareaBox >>> textarea{
    border: 1px solid #ebedf0;
    padding: 10px;
    border-radius: 10px;
  }
.formTittle{
  background-color: #ffffff;
  font-size: 0.45rem;
  line-height: 0.7rem;
  padding: 0.2rem;
}
</style>
