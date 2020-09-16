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
      <van-cell title="选择辅办人员" />
      <van-checkbox-group v-model="result">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in list"
            clickable
            :key="item.id"
            :title="` ${item.name}`"
            @click="toggle(index)"
          >
            <template #right-icon>
              <van-checkbox :name="item.id"  ref="checkboxes" ></van-checkbox>
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <div style="text-align: center; margin-top: 20px;padding: 0 20px;">
        <van-button color="#c30000"  size="small" @click="saveName">保存</van-button>
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
          that.fetchPost("restApi/mobile/getUserByDept",{caseId:this.$route.params.id}).then((res)=>{
            console.log(res);
            var personList=res.data.data.data;
            for(var i=0;i<personList.length;i++){
              that.list.push({id:personList[i].userId,name:personList[i].name})
            }

          }).catch(

          )
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

  .van-button--small{
    padding: 0 15px;
  }
  .navBox >>>.van-nav-bar__text{
    color: #000000;
  }
  .navBox >>>.van-icon-arrow-left{
    color: #000000;
  }
</style>
