<template lang="html">
  <div >


  </div>
</template>

<script>
 import AdList from '../ad/AdList'
export default {
  name:"MyAdList",
  components:{
      AdList,

    },
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
