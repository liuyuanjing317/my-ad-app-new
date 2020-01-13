<template>
  <div>
    <!--<BackHeaderTitleBar  />-->
    <div>
      <mt-navbar style="margin-top:48px;" v-model="selected">
        <mt-tab-item id="1">登录</mt-tab-item>
        <mt-tab-item id="2">注册</mt-tab-item>
      </mt-navbar>
    </div>
  </div>

</template>

<script>
    import BackHeaderTitleBar from '../../common/BackHeaderTitleBar';

    export default {
        name: "Login",
        components:{
            BackHeaderTitleBar,

        },
        data(){
            return{
                selected:1
            }
        }
    }
</script>

<style scoped>

</style>
