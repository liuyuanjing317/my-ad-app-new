<template>
  <div class="page-loadmore">
    <h1 class="page-title">Pull up</h1>
    <p class="page-loadmore-desc">在列表底部, 按住 - 上拉 - 释放可以获取更多数据</p>
    <p class="page-loadmore-desc">此例请使用手机查看</p>
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <!-- page-loadmore-wrapper元素是loadmore模块的父级盒子，它的高度是绑定了一个响应式的值wrapperHeight -->
      <!-- 在生命周期mounted的时候为page-loadmore-wrapper计算高度 -->
      <!-- page-loadmore-wrapper有一个ref属性，这就是给这个DOM元素添加了一个引用，在当前组件里可以用this.$refs的形式来调用这个DOM元素 -->
      <loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        <!-- loadmore组件，传进去了两个属性，loadmore会从props接收到，loadBottom方法和allLoaded属性 -->
        <!-- loadBottom方法用于给列表添加数据项，allLoaded是个布尔值，判断是否数据已经全部加载完了 -->
        <!-- 还给loadmore组件绑定了一个自定义事件bottom-status-change，用于更改bottomStatus这个属性值 -->
        <!-- bottom-status-change的触发是在loadmore组件内部判断触发的，子组件$emit触发 -->
        <ul class="page-loadmore-list">
          <li v-for="(item, key, index) in list" :key="index" class="page-loadmore-listitem">{{ item }}</li>
        </ul>
        <!-- page-loadmore-list是数据列表 -->
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'">
            <a>加载中...</a>
          </span>
        </div>
        <!-- bottom插槽插入的内容是上拉的时候，数据列表上移后下面出现的箭头和loading文字或者动画 -->
        <!-- 箭头和文字都随着bottomStatus值来改变显示状态和样式 -->
        <!-- bottomStatus有三种状态：pull，drop，loading -->
        <!-- loading的时候显示文字或者动画，其它时候显示箭头 -->
      </loadmore>
      <!-- loadmore组件有三个插槽，top，bottom和默认插槽 -->
      <!-- top是列表下移后上方出现的箭头和loading文字，bottom是上移后下方出现的箭头和文字，默认插槽就是数据列表 -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .page-loadmore-listitem {
    height: 50px;
    line-height: 50px;
    border-bottom: solid 1px #eee;
    text-align: center;
  }
  .page-loadmore-wrapper {
    overflow: scroll;
  }
  .mint-loadmore-bottom {
    span {
      display: inline-block;
      transition: .2s linear;
    }
    .is-rotate {
      transform: rotate(180deg);
    }
  }
</style>

<script>
    import loadmore from '@/components/common/loadmore'
    export default {
        name:"loadMore",
        data () {
            return {
                list: [],//数据列表
                allLoaded: false,//是否全部加载
                bottomStatus: '',//下方loading层状态
                wrapperHeight: 0//包裹盒子高度
            }
        },
        methods: {
            handleBottomChange(status) {//改变bottomStatus状态，下方的箭头和加载文字会随着bottomStatus改变样式或者内容
                this.bottomStatus = status;
            },
            loadBottom() {//加载更多数据列表
                setTimeout(() => {
                    let lastValue = this.list[this.list.length - 1];
                    if (lastValue < 40) {
                        for (let i = 1; i <= 10; i++) {
                            this.list.push(lastValue + i);
                        }
                    } else {
                        this.allLoaded = true;//数据全部加载完了，就改变allLoaded
                    }
                    this.$refs.loadmore.onBottomLoaded();//加载完数据之后调用loadmore组件的onBottomLoaded方法
                }, 1500);
            }
        },
        components: {
            loadmore
        },
        created () {//created的时候先给数据列表里填入20条数据
            for (let i = 0; i <= 20; i++) {
                this.list.push(i)
            }
        },
        mounted () {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
            //计算page-loadmore-wrapper的高度
            //html元素的clientHeight - page-loadmore-wrapper盒子距离页面顶部的高度
            //Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置
            //也就是除了页面上面的内容之外，下面整个就是page-loadmore-wrapper盒子，wrapper盒子给一个死高度之后，多给一个overflow:scroll;的样式，这样内容就可以通过滑动看到了
        }
    }
</script>
