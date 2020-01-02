<template>
  <div class="page-tabbar">
    <div class="page-wrap">

      <BackHeaderTitleBar  />
      <div style="margin-top:48px;">
      </div>
      <h3><center>『 {{detail.adName}} 』</center></h3>
      <br/>
      <div id="content" >
        <ul>
          <li><span>产品编号：</span>{{detail.adNo}}</li>
          <li><span>产品名称：</span>{{detail.adName}}</li>
          <li><span>产品地址：</span>{{detail.adAddr}}</li>

        </ul>
        <!--<div v-html="articleDetail.subtitle"></div>-->
        <!--  <span>{{articleDetail.content}}</span>-->
      </div>
      <hr style="height: 3px;border: none;background-color: #ddd;background-image: repeating-linear-gradient(-45deg, #fff, #fff 4px, transparent 4px, transparent 8px);"/>
      <div style="border-left: 3px solid #f44336;float: left;text-align: left">
        <br/>
        <div style="margin-bottom:8px;">
          &nbsp;&nbsp;&nbsp;&nbsp;<strong style="font-size:18px;">本文作者：&nbsp;&nbsp;</strong>
          <!--  <span style="font-size:16px;">{{articleDetail.author}}</span>-->
        </div>
        <div style="margin-bottom:8px;">
          &nbsp;&nbsp;&nbsp;&nbsp;<strong style="font-size:18px;">发表时间：&nbsp;&nbsp;</strong>
          <!-- <#-- <span style="font-size:16px;">{{articleDetail.gmtCreate}}</span>&ndash;&gt;-->
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;<strong style="font-size:18px;">版权声明：&nbsp;&nbsp;</strong>
          <span style="font-size:16px;">本项目所有解释权归<strong>TyCoding</strong>所有</span>
        </div>
        <br/>
      </div>
      <br/>
      <br/>
      <br/>
  </div>
  </div>

</template>
<script>
    import axios from 'axios'
    import BackHeaderTitleBar from '../../common/BackHeaderTitleBar';

export default {
    name: "AdDetail",
    components:{
        BackHeaderTitleBar,

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
      overflow: hidden;
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
