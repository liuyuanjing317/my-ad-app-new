<template>
 <!-- <div >-->
   <!-- <HeaderPage></HeaderPage>-->
    <div class="page-wrap">
      <!-- 自定义头组件 -->
      <titlebar
        leftTitle="AD"
        :rightFirstImg="require('../../assets/img/ic_search.png')"
        :rightSecondImg="require('../../assets/img/ic_add.png')"
      />

      <SwipeImgItem></SwipeImgItem>
      <mt-tab-container class="page-tabbar-container" v-model="active">
        <mt-tab-container-item id="message">
          <MessageList></MessageList>
        </mt-tab-container-item>
       <!-- <mt-tab-container-item id="contact">
          <contact></contact>
        </mt-tab-container-item>
        <mt-tab-container-item id="find">
          <find></find>
        </mt-tab-container-item>
        <mt-tab-container-item id="me">
          <me></me>
        </mt-tab-container-item>-->
      </mt-tab-container>
    </div>
  <!--  <h1>Hello index</h1>
    <h2>Essential Links</h2>-->
 <!-- </div>-->

</template>

<script>
  import titlebar from '../common/TitleBar';
  import HeaderPage from '../common/HeaderPage';
  import SwipeImgItem from '../centeral/SwipeImgItem';
  import MessageList from '../centeral/MessageList'
    export default {
        name: "Index",
        components:{
            HeaderPage,
            titlebar,
            SwipeImgItem,
            MessageList,
        },
        data(){
            return{
                selected:12121,
                active:"message",
            }
        }
    }
</script>

<style scoped>
  .page-tabbar {
    overflow: hidden;
    /* height: 100vh; */
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
