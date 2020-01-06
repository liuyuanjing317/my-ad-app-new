<template lang="html">
  <div >

    <seller
      class="itemstyle"
      v-for="(item,index) in datas.data"
      :key="index"
      :data="item"
      @click.native="clickItem(item)"
    ></seller>

  </div>
</template>

<script>
 import Message from '../../common/Message'
import messagelist from '../../../json/messagelist.json'
 import axios from 'axios'
 import seller from '../../common/seller-list-item';
export default {
  name:"AdList",
  data() {
    return {
      datas:[]
    }
  },
    mounted(){
        this.getData();

        window.addEventListener('scroll', this.handleScroll);
    },
  methods:{
      clickItem(n) {
          this.jump(n);
      },
      jump(data){
          console.log(data);
          this.$router.push({
              path:'/adDetail',
              query:{
                  data:data
              }
          });
      },
      getData(){
          let self=this;
          let data={};
          data.pageSize=100;
          data.pageNum=1;
          axios.post(this.GLOBAL.adUrl+'/getPageList',data).then(function(res) {
              self.datas = res.data.data;

          });
      },
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
