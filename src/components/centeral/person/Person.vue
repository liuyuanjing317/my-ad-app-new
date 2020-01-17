<template lang="html">
  <div class="rootDiv">
    <!-- 头布局 -->
    <div class="headView">
      <div class="leftDiv" v-if="login">
     <!--   <div v-if="unLogig">-->
          <img src="../../../assets/icon/avator.jpg" alt="" class="leftImg">
          <div class="labeldiv" v-model="user">
            <span class="name" >{{user.userName}}</span>
            <span class="wechatcode" >{{user.userPhone}}</span>
          </div>
      </div>
      <div class="leftDiv"  v-if="unLogig">
        <!--   <div v-if="unLogig">-->
        <img src="../../../assets/icon/avator.jpg" alt="" class="leftImg">
        <div class="labeldiv"  @click="loginAndRegister">
          <span class="name" >登陆/注册</span>
        </div>
        <!-- </div>-->
        <!--<div v-if="unLogig">
          <img src="../../../assets/icon/avator.jpg" alt="" class="leftImg">
          <div class="labeldiv">
            <span class="name" >登陆/注册</span>
           &lt;!&ndash; <span class="wechatcode" v-model="userPhone"></span>&ndash;&gt;
            &lt;!&ndash;<span class="wechatcode" v-model="userPhone"></span>&ndash;&gt;
          </div>
        </div>-->

      </div>
      <img src="../../../assets/img/ic_qr_code.png" alt="" class="rightImg">
    </div>
    <!-- 每个条目布局，这里为了方便就一个个列出来了，
    我们可以定义一个 json 数组「单独文件，或是在
    data 中模拟数组」，然后遍历出来即可，可以自行试一试
    -->
   <!-- <commonitem
      :class="[isActive==true?peritemMrgingStyle:peritemMrgingStyleNotMaring]"
      :leftImg="require('../../../assets/icon/profile.png')"
      leftLable="登陆"
      :flag="'Login.vue'"
    />-->



    <commonitem
      :class="[isActive==true?peritemMrgingStyle:peritemMrgingStyleNotMaring]"
      :leftImg="require('../../../assets/icon/work.png')"
      leftLable="新增项目"
      :flag="'addProject'"
    />

    <commonitem
      :class="[isActive==true?peritemMrgingStyle:peritemMrgingStyleNotMaring]"
      :leftImg="require('../../../assets/icon/problem.png')"
      leftLable="我的回复"

      :flag="'reply'"
      :isShowDivider=true
    />
    <commonitem
      :class="[isActive==true?peritemMrgingStyle:peritemMrgingStyleNotMaring]"
      :leftImg="require('../../../assets/icon/profile.png')"
      leftLable="修改信息"
      :flag="'edit'"
    />
    <commonitem
      :class="[isActive==true?peritemMrgingStyle:peritemMrgingStyleNotMaring]"
      :leftImg="require('../../../assets/icon/profile.png')"
      leftLable="退出登陆"
      :flag="'logout'"
      @click.native="logout"

    />
  </div>

</template>

<script>
import CommonItem from '../../common/CommonItem.vue'
export default {
    name:"Person",
  data() {
    return {
      isActive:true,
      peritemMrgingStyle:'itemStyle',
      peritemMrgingStyleNotMaring:'itemStyleNotMargin',
      user:{
          userName:"liuyuanjing",
          userPhone:18275309818,
      }  ,
      unLogig:true,
      login:false,
    }
  },
  mounted(){
      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if(userInfo!=null){
          this.user.userName=userInfo.username;
          this.user.userPhone=userInfo.mobile;
          this.unLogig=false;
          this.login=true;
      }
  },
  methods:{
      loginAndRegister(){
          var data={};
          data.selected="person";
          this.$router.push({
              path:"/login",
              query:{
                  data:data
              }
          });
      },
      logout(){
          localStorage.removeItem('userInfo');
          this.unLogig=true;
          this.login=false;
      }

  },
  components:{
    'commonitem':CommonItem
  }
}
</script>

<style lang="css" scoped>
/* 根样式 */
.rootDiv {
  background-color: #e3e3e3;
  padding-top: 15px;
  height: 100vh;
}
/* 第一个头布局 */
.headView {
  background-color: #fff;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
/* 头布局左边布局 */
.leftDiv {
  display: flex;
  align-items: center;
}
/* 头布局姓名公号布局 */
.labeldiv {
  margin-left: 18px;
  display: flex;
  flex-direction: column;
}
/* 头像 */
.leftImg {
  width: 65px;
  height: 65px;
}
/* 公号二维码 */
.rightImg {
  width: 25px;
  height: 25px;
}
/* 名字 */
.name {
  font-size: 18px;
}
/* 微信号 */
.wechatcode {
  margin-top: 4px;
  color:#d3d3d3;
}

.itemStyle {
  margin-top:15px;
  padding-left:10px;
  padding-right:10px
}
.itemStyleNotMargin{
  padding-left:10px;
  padding-right:10px
}
</style>
