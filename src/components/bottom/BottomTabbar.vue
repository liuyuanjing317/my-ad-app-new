<template>
  <mt-tabbar v-model="selected" fixed>
    <mt-tab-item id="tab1">
      <img slot="icon" src="../../assets/icon/all-fill.png">
      tab1
    </mt-tab-item>
    <mt-tab-item id="tab2">
      <img slot="icon" src="../../assets/icon/display-code.png">
      tab2
    </mt-tab-item>
   <!-- <mt-tab-item id="tab3">
      <img slot="icon" src="../../assets/icon/qrcode.png">
      tab3
    </mt-tab-item>-->
    <mt-tab-item id="tab4">
      <img slot="icon" src="../../assets/icon/user-fill.png">
      tab4
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
    export default {
        name: "BottomTabbar",
        data(){
            return{
                selected:"tab1"
            }
        }
    }
</script>

<style scoped>

</style>
