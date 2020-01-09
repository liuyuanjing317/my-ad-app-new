<template lang="html">
  <div >
    <BackHeaderTitleBar v-if="adFlag" :selectedTab="'ad'" />
    <AdListItem
      class="itemstyle"
      v-for="(item,index) in datas"
      :key="index"
      :data="item"
      :adFlag="adFlag"
    ></AdListItem>
    <!--@click.native="clickItem(item)"-->

  </div>
</template>

<script>
 import Message from '../../common/Message'
 import messagelist from '../../../json/messagelist.json'
 import axios from 'axios'
 import AdListItem from '../../common/AdListItem';
 import BackHeaderTitleBar from '../../common/BackHeaderTitleBar';
export default {
  name:"AdList",
  components:{
        'message':Message,
        AdListItem,
        BackHeaderTitleBar,
    },
  data() {
    return {
      datas:[],
      adFlag:false,
    }
  },
  /*props:{
      adFlag:{
            default:false
        },
    },*/

    mounted(){
        var data=this.$route.query.data;
        if(data !=null){
            console.log(data);
            this.adFlag = data.adFlag;
        }
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
          data.pageSize=20;
          data.pageNum=1;
          data.type="docList";
          axios.post(this.GLOBAL.adUrl+'/getPageList',data).then(function(res) {
              console.log(res);
              self.datas = res.data.data;
              console.log(self.datas);

          });
      },
  },


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
