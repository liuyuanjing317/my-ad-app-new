<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <BackHeaderTitleBar  :selectedTab="selectedTab"/>
      <div style="margin-top: 48px">
        <div>
          <mt-field label="账户名" placeholder="请输入账户名" v-model="detail.username"></mt-field>
          <mt-field label="昵称" placeholder="请输入昵称" v-model="detail.nickname"></mt-field>
          <mt-field label="电话号码" placeholder="请输入电话号码"  v-model="detail.mobile"></mt-field>
          <mt-field label="邮箱" placeholder="请输入邮箱"  v-model="detail.email"></mt-field>
          <div class="mint-cell">
            <div class="mint-cell-left"></div>
            <div class="mint-cell-wrapper">
              <div  class="mint-cell-title">
                <span style="margin-top: 10px;" class="mint-cell-text">头像</span>
              </div>
              <div>
                <UploadImg  />
              </div>
            </div>

          </div>
        <!--  <mt-cell class="imgTitle" title="标题文字"><UploadImg/></mt-cell>-->

          <mt-button class="system-color"  type="primary" size="large" @click="save">保存</mt-button>

        </div>
      </div>
  </div>
  </div>

</template>
<script>
    import axios from 'axios'
    import BackHeaderTitleBar from '../../common/BackHeaderTitleBar';
    import Comments from '../../common/Comment';
    import { MessageBox } from 'mint-ui';


    import UploadImg from '../../common/UploadImg';

export default {
    name: "PersonEdit",
    components:{
        BackHeaderTitleBar,
        Comments,
        UploadImg,

    },
    data(){
        return {
            detail:{
                mobile: null,
                password: null,
                username: "",
                nickname:"",
                email:"",
                avatar:"",
                id:"",
            },
            selectedTab:'person',
            avatar_result:"",
            selected:"baseInfo",
        }
    },
    mounted(){
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        console.log("edit-mounted");

        console.log(userInfo);
        this.detail=userInfo;
        /*console.log(this.$route.query);
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
        this.$emit('headFix', ['fixed',false]);*/
    },
    methods:{

        save(){
            let self=this;
            var userInfo = JSON.parse(localStorage.getItem('userInfo'));
            self.detail.avatar=userInfo.avatar;
            //这里写接口
            let config = {
                headers:{'token':userInfo.token}
            };
            axios.post(this.GLOBAL.loginUrl+"/updateUser",self.detail,config)
                .then(function(res){
                    console.log(res);
                    if(res.data.code == 200){
                        MessageBox.confirm('操作成功，是否跳转列表页!').then(action => {
                                 console.log(action);
                                  var data={};
                                  data.selected="person";
                                self.$router.push({
                                       path:'/',
                                     query:{
                                        data:data
                                     }

                            })
                        });
                    }
                });
        },

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
  .imgTitle{
    mint-cell-title{
      width: 5px!important;
    }
  }
</style>
