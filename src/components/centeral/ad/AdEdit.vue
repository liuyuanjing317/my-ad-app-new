<template>
  <div class="page-tabbar">
    <div class="page-wrap">

      <BackHeaderTitleBar  />
      <div>
        <mt-field label="username" placeholder="Input username" v-model="username"></mt-field>
        <mt-field label="email" placeholder="Input email" type="email" v-model="email"></mt-field>
        <mt-field label="password" placeholder="Input password" type="password" v-modal="password"></mt-field>
        <mt-field label="phone" placeholder="Input tel" type="tel" v-model="phone"></mt-field>
        <mt-field label="website" placeholder="Input website" type="url" v-model="website"></mt-field>
        <mt-field label="number" placeholder="Input number" type="number" v-model="number"></mt-field>
        <mt-field label="birthday" placeholder="Input birthday" type="date" v-model="birthday"></mt-field>
        <mt-field label="introduction" placeholder="introduction" type="textarea" rows="4" v-model="introduction"></mt-field></div>
  </div>
  </div>

</template>
<script>
    import axios from 'axios'
    import BackHeaderTitleBar from '../../common/BackHeaderTitleBar';
    import Comments from '../../common/Comment';

export default {
    name: "AdDetail",
    components:{
        BackHeaderTitleBar,
        Comments,

    },
    data(){
        return {
            detail:{
               id:"1321317161220034",
                adNo:"1",
                adName:"1",
                adPrincipal:"1",
                adAmount:"1",
                adAddr:"1",
                adStatus:1,
                delFlag:null,
                gmtCreate:"2019-12-25 08:00:00",
                projectApprovalDate:null
            }
        }
    },
    mounted(){
        console.log(this.$route.query);
        this.detail=this.$route.query.data;
        if(this.$route.query.id){
            this.id = this.$route.query.id;
            this.getData();//初始化页面时
        }
        window.scroll(0,0);
        this.$emit('headFix', ['fixed',false]);
    },
    methods:{
        getData(){
            let self = this;
            // 获取api分组
            axios.get(this.GLOBAL.serverUrl+"/article/detail?id="+self.id)
                .then(function(res){
                    console.log(res);
                    if(res.data.code == 200){
                        self.detail=res.data.data
                    }
                });
        },
    }

}
</script>
<style lang="scss" scoped>
    .product-detail {
        figure {
            figcaption {
                color: #ffffff;
                text-align: left;
                position: absolute;
                left: 6%;
                top: 30%;
                h1 {
                    font-size: 2.5rem;
                }
            }
        }
        .detail-content {
            padding: 2% 5%;
            .detail-block {
                margin-bottom: 5%;
                .elem-quote {
                    text-align: left;
                    text-indent: 1em;
                    margin-bottom: 10px;
                    line-height: 22px;
                    border-left: 5px solid #009688;
                    border-radius: 0 2px 2px 0;
                }
                .product-info {
                    text-align: left;
                    font-size: 15px;
                    line-height: 25px;
                }
                ul {
                    text-align: left;
                    padding-left: 2%;
                    list-style-type: disc;
                }
            }
        }

    }
    .page-tabbar {
     // overflow: hidden;
      height: 100vh;
    }
    /*修改tab 默认文字的颜色*/
    .mint-tabbar > .mint-tab-item{
      color:#999999;
    }
    /* 修改默认 tab 选中文字的样式 */
    .mint-tabbar > .mint-tab-item.is-selected {
      background-color: transparent;
      color:#45C018;
    }

    .page-wrap {
      overflow: auto;
      /* height: 92%; */
      padding-bottom: 60px;
    }
</style>
