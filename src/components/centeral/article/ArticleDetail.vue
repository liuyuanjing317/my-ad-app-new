<template>
    <div style="margin-top: 100px" class="product-detail">
     <!-- <figure>
        <figcaption>
          <h1>产品中心</h1><br>
          <p>强大产品矩阵，助力综合能源服务创新升级，如智能产品、能效产品、软件产品...</p>
        </figcaption>
        <img src="../../../static/img/products_new/header_img_cut.png" width="100%" height="555px">
      </figure>-->
      <h3><center>『 {{articleDetail.title}} 』</center></h3>
      <br/>
      <div id="content" >
        <div v-html="articleDetail.content"></div>
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
         <!-- <#&#45;&#45; <span style="font-size:16px;">{{articleDetail.gmtCreate}}</span>&ndash;&gt;-->
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
</template>
<script>
    import axios from 'axios'
export default {
    name: 'ArticlDdetail',
    data(){
        return {
            articleDetail:{}
        }
    },
    mounted(){
        console.log(this.$route.query);
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
                        self.articleDetail=res.data.data
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

</style>
