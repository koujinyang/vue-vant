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
              <van-checkbox :name="item.name"  ref="checkboxes" ></van-checkbox>
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
          list: [{id:1,name:'张三'},{id:2,name: '李四'} ],
          result: [],
        };
      },
      methods:{
        onClickLeft() {
          this.$router.go(-1)
        },
        toggle(index) {
          this.$refs.checkboxes[index].toggle();
        },
        saveName(){
          console.log(this.result);
          this.$router.go(-1);
        }
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
</style>
