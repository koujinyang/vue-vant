<template>
    <div>
      <van-nav-bar
        title="设置辅办"
        fixed
        placeholder
        left-arrow
        @click-left="onClickLeft"
        class="navBox"
      />
      <div class="formTittle">选择辅办人员</div>
<!--      <van-cell title="选择辅办人员" class="noBottom">-->
<!--        <template #title>-->
<!--          <div class="tittle">选择辅办人员</div>-->
<!--        </template>-->
<!--      </van-cell>-->
      <van-checkbox-group v-model="result">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in list"
            clickable
            :key="item.id"
            :title="` ${item.name}`"
            @click="toggle(index)"
          >
            <template #icon>
              <van-checkbox :name="item.id" icon-size="0.5rem" checked-color="#d51927" ref="checkboxes" class="checkboxBox"></van-checkbox>
            </template>
            <template #title>
              <div class="setFubanName">{{item.name}}</div>
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <div style="text-align: center; margin-top: 20px;padding: 0 20px;">
        <van-button color="#d51927"  size="small" @click="saveName">保存</van-button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "SetFuban",
      data() {
        return {
          list: [],
          result: [],
        };
      },
      methods:{
        getDeptData(){
          let that=this;
          if(that.$route.params.id.split(',').length==1){
            that.fetchPost("restApi/mobile/detail",{caseId:this.$route.params.id}).then((res)=>{
              var result=res.data.data.data.assistLawyernames.split(',');
              that.fetchPost("restApi/mobile/getUserByDept",{caseId:this.$route.params.id}).then((res)=>{
                console.log(res);
                var personList=res.data.data.data;
                for(var i=0;i<personList.length;i++){
                  that.list.push({id:personList[i].userId,name:personList[i].name});
                  for (let j = 0; j < result.length; j++) {
                    if(personList[i].name==result[j]){
                      that.result.push(personList[i].userId);
                    }
                  }
                }

              }).catch(

              )
            }).catch()
          }else {
            that.fetchPost("restApi/mobile/getUserByDept",{caseId:this.$route.params.id}).then((res)=>{
              console.log(res);
              var personList=res.data.data.data;
              for(var i=0;i<personList.length;i++){
                that.list.push({id:personList[i].userId,name:personList[i].name});
              }

            }).catch(

            )
          }

        },
        onClickLeft() {
          this.$router.go(-1)
        },
        toggle(index) {
          this.$refs.checkboxes[index].toggle();
        },
        saveName(){
          console.log(this.result);
          let that=this;
          that.fetchPost("restApi/mobile/batchAddAssitLawyer",{caseIds:this.$route.params.id,attorney:that.result.toString()}).then((res)=>{
            console.log(res);
            if(res.data.code==200){
              this.$toast("设置辅办成功");
            }else {
              this.$toast(res.data.message);
            }

            this.$router.go(-1);
          }).catch(

          )

        }
      },
      mounted() {
        console.log(this.$route.params.id);
        this.getDeptData()
      }
    }
</script>

<style scoped>

  .formTittle{
    font-size: 0.4rem;
    line-height: 1.2rem;
    color: #5c5c5c;
    /*background-color: #cccccc;*/
    padding: 0 30px;
  }
  .setFubanName{
    font-size: 0.4rem;
  }
  .checkboxBox{
    margin-right: 20px;
  }
  .noBottom::after{
    border: none;
  }
  .van-button--small{
    padding: 0 15px;
  }
  .navBox >>> .van-nav-bar__title{
    color: #5c5c5c;
    font-size: 20px;
    font-weight: 600;
  }
  .navBox >>>.van-icon-arrow-left{
    color: #5c5c5c;
  }
</style>
