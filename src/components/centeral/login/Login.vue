<!-- 登录 组件 -->

<template>
  <div class="login">
    <BackHeaderTitleBar :selectedTab="'person'"/>
    <div style="padding-top: 43px">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">登录</mt-tab-item>
        <mt-tab-item id="2">注册</mt-tab-item>
      </mt-navbar>
      <mt-popup
        v-model="popupVisible"
        position="top"
        popup-transition="popup-fade">
        <ul >
          内容
        </ul>
      </mt-popup>
      <mt-tab-container v-model="selected">
        <!-- 登录 -->
        <mt-tab-container-item id="1" >
          <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
          <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
          <mt-button type="primary" size="large" @click.native="login">登录</mt-button>
        </mt-tab-container-item>

        <!-- 注册 -->
        <mt-tab-container-item id="2">
          <mt-field label="用户名" placeholder="请输入用户名" v-model="register_username"></mt-field>
          <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="register_email"></mt-field>
          <mt-field label="密码" placeholder="请输入密码" type="password" v-model="register_password1"></mt-field>
          <mt-field label="确认密码" placeholder="请确认密码" type="password" v-model="register_password2"></mt-field>
          <mt-button type="primary" size="large" @click.native="register">注册</mt-button>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import BackHeaderTitleBar from '../../common/BackHeaderTitleBar';

export default {
    name:"Login",
    components:{
        BackHeaderTitleBar,
    },
  data () {
    return {
      selected: '1',
      username: '',
      password: '',
      register_username: '',
      register_email: '',
      register_password1: '',
      register_password2: '',
      popupVisible:false,
       /*userInfo:{
           accountNonExpired: true,
           accountNonLocked: true,
           authorities: [],
           body: "",
           credentialsNonExpired: true,
           departmentId: null,
           enabled: true,
           mobile: "18275309818",
           password: null,
           statusCode: 0,
           token: null,
           username: "admin",
       }*/
    }
  },
  props: {},
  watch: {},
  methods: {
    back () {
      this.$router.push({
        path: '/index'
      })
    },
    login () {
        Indicator.open({
            text: 'Loading...',
            spinnerType: 'fading-circle'
        });
      axios.post( this.GLOBAL.loginUrl+'/login', {
        username: this.username,
        password: this.password
      }).then(res => {
          if(res.data.code == 200){
              localStorage.setItem("userInfo",JSON.stringify(res.data.data));
              var list = JSON.parse(localStorage.getItem("userInfo") )
              Indicator.close();
              MessageBox.alert("登陆成功", "提示");
              var data={};
              data.selected="person";
              this.$router.push({
                  path:'/',
                  query:{
                          data:data
                      }
              })
          }
      }).catch(err => {
        console.log(err)
      })
    },
    register () {
        Indicator.open({
            text: 'Loading...',
            spinnerType: 'fading-circle'
        });
        axios.post( this.GLOBAL.loginUrl+'/register', {
            username: this.register_username,
            password: this.register_password1
        }).then(res => {
            console.log(res);
            if(res.data.code == 200){
                Indicator.close();
                MessageBox.alert("注册成功，请登录", "提示");
                this.selected=1;
                /*this.$router.push({
                    path:'/'

                })*/
            }
        }).catch(err => {
            console.log(err)
        })
    }
  },
  filters: {},
  computed: {},
  created () {},
  mounted () {}
}
</script>

<style lang="scss">
@import '../../../assets/scss/mixin.scss';


/*.login {
  color: #333;
  margin-top: 40px;
  background-color: #fff;
  overflow: visible;
  .login-wrapper {
    margin-top: 20px;
    overflow: hidden;
    .mint-button {
      margin-top: 30px;
    }
  }
  .register-wrapper {
    margin-top: 20px;
    overflow: hidden;
    .mint-button {
      margin-top: 30px;
    }
  }
  .mint-cell-value .mint-field-core{
    line-height: 21px;
    width: 100%;
    height: 40px;
    margin-bottom:0px;
    padding: 10px 15px;
    -webkit-user-select: text;
    border:none
  }
}*/

</style>
