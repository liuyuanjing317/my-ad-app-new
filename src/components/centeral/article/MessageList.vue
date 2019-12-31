<template lang="html">
  <div class="">

   <!-- <message
      class="itemstyle"
      v-for="(item,index) in datas.data"
      :key="index"
      :id="item.id"
      :title="item.title"
      :subtitle="item.subtitle"
      :sendtime="item.time"
      :imgurl="require('../../assets/img/listImg.png')"
      :itemClick="clickitem"

    ></message>-->
    <DocItem
      class="itemstyle"
      v-for="(item,index) in datas.data"
      :key="index"
      :data="item"
      :imgurl="require('../../../assets/img/listImg.png')"
      @click.native="clickItem(item)"
    ></DocItem>
  </div>
</template>

<script>
import DocItem from '../../common/DocItem'
import doclist from '../../../json/doclist.json'
export default {

  data() {
    return {
      datas:doclist
    }
  },
  methods:{
    clickItem(n) {
        console.log(11111111);
        console.log(n);
        this.jump(n);
    },
      jump(data){
          this.$router.push({
              path:'/articleDetail',
              query:{
                  data:data
              }
          });
      },
  },

  components:{
      DocItem,
      doclist
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
