<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <!-- 自定义头组件 -->
      <titlebar
        leftTitle="AD"
        :rightSecondImg="require('../../assets/img/ic_search.png')"

      />
      <!--:rightSecondImg="require('../../assets/img/ic_add.png')"-->
      <div style="margin-top:48px;">
      </div>
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="message">
          <SwipeImgItem></SwipeImgItem>
          <messagelist></messagelist>
           </mt-tab-container-item>
        <mt-tab-container-item id="ad">
          <AdList />
        </mt-tab-container-item>
        <mt-tab-container-item id="person">
          <Person></Person>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="message">
        <img slot="icon" src="../../assets/icon/all-fill.png">
        文章列表
      </mt-tab-item>
      <mt-tab-item id="ad">
        <img slot="icon" src="../../assets/icon/display-code.png">
       项目列表
      </mt-tab-item>
      <mt-tab-item id="person">
        <img slot="icon" src="../../assets/icon/user-fill.png">
        个人信息
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
     import TitleBar from '../common/TitleBar';
     import MessageList from '../centeral/article/MessageList';
     import AdList from '../centeral/ad/AdList'
     import SwipeImgItem from '../centeral/article/SwipeImgItem';
     import BottomTabbar from '../bottom/BottomTabbar';
     import Person from '../centeral/person/Person';
     export default {
        name: 'Index',
        data() {
            return {
                selected:'message',
            };
        },
        components:{
            'titlebar':TitleBar,
            'messagelist':MessageList,
            SwipeImgItem,
            BottomTabbar,
            Person,
            AdList,

        },
         mounted(){
             var data=this.$route.query.data;
             if(data !=null &&data.selected!=null){
                 this.selected = data.selected;
             }
             /*if(data !=null &&data.adAddFlag!=null){
                 this.adAddFlag = data.adAddFlag;
             }*/
         },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .page-tabbar {
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
