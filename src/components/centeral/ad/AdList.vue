<template lang="html">
  <div class="">

    <seller
      class="itemstyle"
      v-for="(item,index) in datas.data"
      :key="index"
      :data="item"

    ></seller>

  </div>
</template>

<script>
 import Message from '../../common/Message'
import messagelist from '../../../json/messagelist.json'
 import seller from '../../common/seller-list-item';
export default {
  name:"AdList",
  data() {
    return {
      datas:messagelist
    }
  },
  methods:{
    clickitem(n) {
        console.log(n)
    }
  },

  components:{
    'message':Message,
      seller,

  }
}
</script>

<style lang="css" scoped>

.itemstyle{
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom:1px solid #d9d9d9;
}
</style>
