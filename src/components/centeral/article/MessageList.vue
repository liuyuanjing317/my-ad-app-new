<template lang="html">
  <div class="page-loadmore">
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class="page-loadmore-list">
         <!-- <li v-for="(item, key, index) in datas.data" :key="index" class="page-loadmore-listitem">-->
            <DocItem
              class="itemstyle"
              v-for="(item, key, index) in datas.data"
              :key="index"
              :data="item"
              :imgurl="require('../../../assets/img/listImg.png')"
              @click.native="clickItem(item)"/>

         <!-- </li>-->
        </ul>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'">
            <a>加载中...</a>
          </span>
        </div>
      </loadmore>
    </div>
<!--    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="5">
      <li  v-for="(item,index) in datas.data">
        <DocItem
          class="itemstyle"
          :key="index"
          :data="item"
          :imgurl="require('../../../assets/img/listImg.png')"
          @click.native="clickItem(item)"
        ></DocItem>
      </li>
    </ul>-->
  </div>
</template>

<script>
import DocItem from './DocItem'
import doclist from '../../../json/doclist.json'
import axios from 'axios'
import loadmore from '@/components/common/loadmore'
export default {
  components:{
        DocItem,
        doclist,
      loadmore,
    },
  data() {
    return {
      datas:{
          count: 0,
          data: [],
          pageSize:5,
          pageIndex: 1,
          pageNums: 0,
          pages: 0,
      },
        list: [],//数据列表
        allLoaded: false,//是否全部加载
        bottomStatus: '',//下方loading层状态
        wrapperHeight: 0//包裹盒子高度
    }
  },
  created () {//created的时候先给数据列表里填入20条数据
        for (let i = 0; i <= 20; i++) {
            this.list.push(i)
        }
    },
  mounted(){
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      let self=this;
      this.getData(self.datas.pageSize,self.datas.pageIndex);
    },
  methods:{
    clickItem(n) {
        this.jump(n);
    },
    jump(data){
          this.$router.push({
              path:'/articleDetail',
              query:{
                  data:data
              }
          });
      },
      getData(pageSize,currentPage){
          let self=this;
          let data={};
          data.pageSize=pageSize;
          data.pageNum=currentPage;
          data.type="docList";
          axios.post(this.GLOBAL.serverUrl+'/service/getLatestList',data).then(function(res) {
              self.datas.pageIndex = res.data.data.pageIndex;
              self.datas.pageNums=res.data.data.pageNums;
              self.datas.count=res.data.data.count;
              for(let i in res.data.data.data){
                  self.datas.data.push(res.data.data.data[i]);
              }
          });
      },
      loadMore() {
          let self=this;
          if(self.datas.count == self.datas.data.length){
              return;
          }
          self.loading = true;
          setTimeout(() => {
              self.getData(self.datas.pageSize,self.datas.pageIndex+1);
              self.loading = false;
          }, 2500);

      },
      handleBottomChange(status) {//改变bottomStatus状态，下方的箭头和加载文字会随着bottomStatus改变样式或者内容
          this.bottomStatus = status;
      },
      loadBottom() {//加载更多数据列表
          setTimeout(() => {
              let self=this;
              if(self.datas.count !=0&& self.datas.count == self.datas.data.length){
                  self.allLoaded = true;//数据全部加载完了，就改变allLoaded
              }else{
                  self.getData(self.datas.pageSize,self.datas.pageIndex+1);
              }
              this.$refs.loadmore.onBottomLoaded();//加载完数据之后调用loadmore组件的onBottomLoaded方法
          }, 1500);
      }
  },




}
</script>

<style lang="css" scoped>
  .page-loadmore-list{
    margin-left: -50px;
  }
.itemstyle{
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom:1px solid #d9d9d9;
}
.page-loadmore-listitem {
  height: 300px;
  line-height: 300px;
  border-bottom: solid 1px #eee;
  text-align: center;
}
.page-loadmore-wrapper {
  overflow: scroll;
}
.mint-loadmore-bottom span{
  display: inline-block;
  transition: .2s linear;
}

.mint-loadmore-bottom.is-rotate {
  transform: rotate(180deg);
}


</style>
