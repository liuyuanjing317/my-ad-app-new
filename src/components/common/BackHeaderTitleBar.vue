<template>

      <mt-header class="page-head">
        <router-link :to="{path: backUrl}"  @click.native="back" slot="left">
          <mt-button icon="back">back</mt-button>
        </router-link>
      </mt-header>


</template>

<script>
    export default {
        name: "BackHeaderTitleBar",
        props:{
            backUrl:{
                default:''
            },
            selectedTab:{
                default:'message'
            },
        },

        data(){
          return {

          }
        },
        methods:{
            back(){
                this.$router.push({
                    path:"/",
                    query:{
                        data:{selected:this.selectedTab}
                    }

                })
               /* if (window.history.length <= 1) {

                    return false
                } else {
                    this.$router.go(-1)
                }*/
            }
        }
    }
</script>

<style scoped>
  .page-tabbar {
    /*overflow: hidden;*/
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
  .page-head {
    display: flex;
    position: fixed;
    z-index: 999;
    width: 100%;
    justify-content: space-between;
    padding-left: 7px;
    padding-right: 7px;
    align-items: center;
    background-color: #3E3A39;
    height: 48px;
    color:#fff;
    font-size: 18px;
    margin-top: -7px;
  }


</style>
