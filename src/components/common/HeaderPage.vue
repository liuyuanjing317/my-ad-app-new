<template>
  <mt-header fixed title="Header">
  <!--  <router-link to="/" slot="left">
      <mt-button icon="back">返回</mt-button>
    </router-link>-->
    <mt-search slot="right"
      v-model="value"
      cancel-text="取消"
      placeholder="搜索">
    </mt-search>

  </mt-header>

</template>

<script>

    export default {
        name: "HeaderPage",
        components:{
        },
    }
</script>

<style scoped>

</style>
