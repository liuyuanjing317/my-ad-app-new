<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <BackHeaderTitleBar  :selectedTab="selectedTab"/>
      <div style="margin-top: 48px">
        <mt-field label="产品编号" placeholder="请输入产品编号" v-model="detail.adNo"></mt-field>
        <mt-field label="产品名称" placeholder="请输入产品名称" v-model="detail.adName"></mt-field>
        <mt-field label="产品金额" placeholder="请输入产品金额"  v-model="detail.adAmount"></mt-field>
        <mt-field label="产品地址" placeholder="请输入产品地址"  v-model="detail.adAddr"></mt-field>
        <mt-button class="system-color"  type="primary" size="large" @click="save">保存</mt-button>
      </div>
      <!--<BatchUploadImg/>-->
  </div>
  </div>

</template>
<script>
    import axios from 'axios'
    import BackHeaderTitleBar from '../../common/BackHeaderTitleBar';
    import Comments from '../../common/Comment';
    import { MessageBox } from 'mint-ui';
    /*import BatchUploadImg from '../../common/BatchUploadImg';*/

export default {
    name: "AdEdit",
    components:{
        BackHeaderTitleBar,
        Comments,
      /*  BatchUploadImg,*/

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
            },
            selectedTab:'ad',
        }
    },
    mounted(){
        console.log(this.$route.query);
        var data=this.$route.query.data;
        if(data!=null && data.selected!=null){
            this.selectedTab=data.selected;
            console.log(this.selectedTab);
            //data.removeAttribute("selected");
        }
        this.detail=data;
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
        save(){
            let self=this;
            var url="";
            if(self.detail.id!=null){
                url="/update";
            }else{
                url="/saveAdd";
            }
            // 获取api分组
            axios.post(this.GLOBAL.adUrl+url,self.detail)
                .then(function(res){
                    console.log(res);
                    if(res.data.code == 200){

                       /* Toast({
                            message: 'operation success',
                            iconClass: 'icon icon-success'
                        });*/
                        MessageBox.confirm('操作成功，是否跳转列表页!').then(action => {
                                 console.log(action);
                                  var data={};
                                  data.selected="ad";
                                self.$router.push({
                                       path:'/',
                                     query:{
                                        data:data
                                     }

                            })
                        });
                    }
                });
        }
    }

}
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/system-css'; /*引入公共样式*/
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
