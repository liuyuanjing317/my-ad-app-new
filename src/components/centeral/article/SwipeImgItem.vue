<template>
  <mt-swipe  style="height: 200px;background-color: blanchedalmond" :auto="4000">
    <mt-swipe-item  v-for="(item,index) in datas.data"
                    :key="index"
                    :data="item"   @click.native="clickItem(item)">
      <img src="../../../assets/img/air.png">
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
    import doclist from '../../../json/doclist.json'
    export default {
        name: "SwipeImgItem",
        components:{
            doclist
        },
        data() {
            return {
                datas:doclist,
                imgurl:"../../../assets/img/listImg.png",
            }
        },
        methods:{
            handleChange(index){
                console.log(index);
            },
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
    }
</script>

<style scoped>

</style>
