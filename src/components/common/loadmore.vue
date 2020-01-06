<template>
  <div class="mint-loadmore">
    <!-- mint-loadmore最外层盒子，有overflow:hidden;的样式，这样下方的箭头文字动画或者上方的就会隐藏看不到 -->
    <div class="mint-loadmore-content" :class="{ 'is-dropped': topDropped || bottomDropped}" :style="{ 'transform': transform }">
      <!-- content盒子拥有两个响应式属性，一个在drop的时候添加is-dropped类名，让transform变化更流畅，一个是transform样式，在touchmove的时候，会改变盒子在垂直方向的位置 -->
      <!-- transfrom样式的值是一个计算属性，会随着this.translate变化而变化 -->
      <slot name="top">
        <div class="mint-loadmore-top" v-if="topMethod">
          <span v-if="topStatus === 'loading'" class="mint-loadmore-spinner"></span>
          <span class="mint-loadmore-text">{{ topText }}</span>
        </div>
        <!-- top插槽，列表上拉后下方出现的箭头和loading文字或者动画 -->
        <!-- 当有topMethod这个props传入的时候才显示，此处是备用内容，如果父组件定义了top插槽内容，则备用内容不显示 -->
      </slot>
      <slot></slot>
      <!-- 默认插槽，就是数据列表 -->
      <slot name="bottom">
        <div class="mint-loadmore-bottom" v-if="bottomMethod">
          <span v-if="bottomStatus === 'loading'" class="mint-loadmore-spinner"></span>
          <span class="mint-loadmore-text">{{ bottomText }}</span>
        </div>
      </slot>
      <!-- bottom插槽，列表上拉后下方出现的箭头和loading文字或者动画 -->
      <!-- 当有bottomMethod这个props传入的时候才显示，此处是备用内容，如果父组件定义了bottom插槽内容，则备用内容不显示 -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .mint-loadmore {
    overflow: hidden;
  }
  .mint-loadmore-content .is-dropped {
    transition: .2s;
  }
  .mint-loadmore-bottom {
    text-align: center;
    height: 50px;
    line-height: 50px;
    margin-bottom: -50px;
  }
  .mint-loadmore-top {
    text-align: center;
    height: 50px;
    line-height: 50px;
    margin-top: -50px;
  }
</style>

<script type="text/babel">
    export default {
        name: 'loadmore',
        components: {

        },
        props: {//props后跟着的对象是验证器，type是类型，default是默认值
            maxDistance: {
                type: Number,
                default: 0
            },
            autoFill: {
                type: Boolean,
                default: true
            },
            distanceIndex: {
                type: Number,
                default: 2
            },
            topPullText: {
                type: String,
                default: '下拉刷新'
            },
            topDropText: {
                type: String,
                default: '释放更新'
            },
            topLoadingText: {
                type: String,
                default: '加载中...'
            },
            topDistance: {
                type: Number,
                default: 70
            },
            topMethod: {
                type: Function
            },
            bottomPullText: {
                type: String,
                default: '上拉刷新'
            },
            bottomDropText: {
                type: String,
                default: '释放更新'
            },
            bottomLoadingText: {
                type: String,
                default: '加载中...'
            },
            bottomDistance: {
                type: Number,
                default: 70
            },
            bottomMethod: {//加载下方数据方法
                type: Function
            },
            bottomAllLoaded: {//布尔值，下方数据已经全部加载
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                translate: 0, //content在y轴移动距离
                scrollEventTarget: null, //scroll元素
                containerFilled: false, //当前滚动的内容是否填充完整
                topText: '', //上方提示文字
                topDropped: false, //下拉刷新是否已经释放
                bottomText: '', //下方提示文字
                bottomDropped: false, //底部加载是否已经释放
                bottomReached: false, //是否已经到达底部
                direction: '', //滑动方向
                startY: 0, //开始滑动的时候触点的的Y坐标
                startScrollTop: 0, //开始滑动的时候，scroll盒子的滚动距离
                currentY: 0, //move过程中触点的y轴坐标
                topStatus: '', //上方loading层状态，更新后会传给父组件
                bottomStatus: '' //下方loading层状态，更新后会传给父组件
            };
        },
        computed: {
            transform() {//计算属性transform，，根据translate值变化，用于通过transform样式改变content盒子的y轴坐标
                return this.translate === 0 ? null : 'translate3d(0, ' + this.translate + 'px, 0)';
            }
        },
        watch: {
            topStatus(val) {
                //侦听器，如果topStatus发生变化，这个函数就会运行，触发父级组件的事件，并把topStatus新值作为参数传过去
                this.$emit('top-status-change', val);
                switch (val) {
                    case 'pull':
                        this.topText = this.topPullText;
                        break;
                    case 'drop':
                        this.topText = this.topDropText;
                        break;
                    case 'loading':
                        this.topText = this.topLoadingText;
                        break;
                }
                //根据topStatus的新值改变上方的提示文字
            },
            bottomStatus(val) {
                //侦听器，如果bottomStatus发生变化，这个函数就会运行，触发父级组件的事件，并把bottomStatus新值作为参数传过去
                this.$emit('bottom-status-change', val);
                switch (val) {
                    case 'pull':
                        this.bottomText = this.bottomPullText;
                        break;
                    case 'drop':
                        this.bottomText = this.bottomDropText;
                        break;
                    case 'loading':
                        this.bottomText = this.bottomLoadingText;
                        break;
                }
                //根据bottomStatus的新值改变下方的提示文字
            }
        },
        methods: {
            onTopLoaded() {//父级组件里每次加载完新数据就会调用这个方法
                this.translate = 0;//重置this.translate
                setTimeout(() => {
                    this.topStatus = 'pull';//数据加载完之后topStatus变为pull状态
                }, 200);
            },
            onBottomLoaded() {//父级组件里每次加载完新数据就会调用这个方法
                this.bottomStatus = 'pull'; //数据加载完之后bottomStatus变为pull状态
                this.bottomDropped = false; //数据加载完之后bottomDropped变为false
                this.$nextTick(() => {//数据变化后会更新DOM，DOM更新后会调用$nextTick()里的方法
                    if (this.scrollEventTarget === window) {
                        document.body.scrollTop += 50;
                    } else {
                        this.scrollEventTarget.scrollTop += 50;
                    }//数据加载完之后让对应的scroll盒子向下多滚动50px，也就是说多显示一条数据让用户看到
                    this.translate = 0;//重置this.translate
                });

                if (!this.bottomAllLoaded && !this.containerFilled) {
                    this.fillContainer();
                }
            },
            getScrollEventTarget(element) {//获取overflow:scroll的父级盒子
                let currentNode = element;
                while (currentNode && currentNode.tagName !== 'HTML' &&
                currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
                    //当前传入节点存在且不是html也不是body且是一个元素节点的时候
                    let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
                    //document.defaultView返回document关联的window对象
                    //getComputedStyle()获取元素的计算样式
                    //overflowY是当前传入节点的计算样式overflow-y
                    if (overflowY === 'scroll' || overflowY === 'auto') {
                        return currentNode; //如果当前节点的overflow-y值是scroll或者auto，那就返回此节点
                    }
                    currentNode = currentNode.parentNode;//如果不是，那就获取当前节点的父节点，然后继续判断
                }
                return window;//如果都找不到就返回window对象
            },
            getScrollTop(element) {//获取元素的内容滚动距离
                if (element === window) {
                    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
                    //window.pageYOffset就是Window.scrollY，文档在垂直方向滚动距离
                } else {
                    return element.scrollTop;
                }
            },
            bindTouchEvents() {//为mint-loadmore绑定touch事件操作
                this.$el.addEventListener('touchstart', this.handleTouchStart);
                this.$el.addEventListener('touchmove', this.handleTouchMove);
                this.$el.addEventListener('touchend', this.handleTouchEnd);
            },
            init() {
                this.topStatus = 'pull';//topStatus初始值为pull
                this.bottomStatus = 'pull';//bottomStatus初始值为pull
                this.topText = this.topPullText;
                this.scrollEventTarget = this.getScrollEventTarget(this.$el);
                //获取overflow:scroll的父级盒子
                //传给getScrollEventTarget方法的参数是this.$el,它是当前Vue实例使用的根DOM元素，也就是mint-loadmore
                //this.scrollEventTarget最后获取到是父组件的page-loadmore-wrapper盒子，因为它overflow:scroll;
                if (typeof this.bottomMethod === 'function') {//父级组件传入的加载数据函数如果存在的话
                    this.fillContainer();//判断是否数据填充完全，初始化this.containerFilled的值
                    this.bindTouchEvents();//为mint-loadmore绑定touch事件操作
                }
                if (typeof this.topMethod === 'function') {//父级组件传入的加载数据函数如果存在的话
                    this.bindTouchEvents();//为mint-loadmore绑定touch事件操作
                }
            },
            fillContainer() {//判断是否数据填充完全
                if (this.autoFill) {
                    this.$nextTick(() => {
                        if (this.scrollEventTarget === window) {
                            this.containerFilled = this.$el.getBoundingClientRect().bottom >=
                                document.documentElement.getBoundingClientRect().bottom;
                        } else {
                            this.containerFilled = this.$el.getBoundingClientRect().bottom >=
                                this.scrollEventTarget.getBoundingClientRect().bottom;
                            //如果mint-loadmore的bottom值大于等于滚动盒子的bottom值，说明数据填充完全了，this.containerFilled为true
                        }
                        if (!this.containerFilled) {
                            this.bottomStatus = 'loading';
                            this.bottomMethod();
                            //如果数据并没有填充完全，则bottomStatus状态为loading，执行父组件的加载数据方法
                        }
                    });
                }
            },
            checkBottomReached() {//检查是否已经滑到底部
                if (this.scrollEventTarget === window) {
                    /**
                     * fix:scrollTop===0
                     */
                    return document.documentElement.scrollTop || document.body.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight;
                    //如果scroll元素是window的话，就判断文档滑动距离加上文档高度是否大于等于body的内容高度
                } else {
                    return parseInt(this.$el.getBoundingClientRect().bottom) <= parseInt(this.scrollEventTarget.getBoundingClientRect().bottom) + 1;
                }
            },
            handleTouchStart(event) {
                this.startY = event.touches[0].clientY;
                //TouchEvent.touches返回所有当前在与触摸表面接触的Touch对象
                //Touch对象表示在触控设备上的触摸点
                //Touch.clientY，触点相对于可见视区上边沿的的Y坐标
                //this.startY是开始滑动的时候触点的Y坐标
                this.startScrollTop = this.getScrollTop(this.scrollEventTarget);
                //开始滑动的时候，scroll盒子的滚动距离
                this.bottomReached = false;
                //是否已经滑动到底部
                if (this.topStatus !== 'loading') {//如果上方提示块并未处于加载阶段就重置topStatus和topDropped
                    this.topStatus = 'pull';
                    this.topDropped = false;
                }
                if (this.bottomStatus !== 'loading') {//如果下方提示块并未处于加载阶段就重置bottomStatus和bottomDropped
                    this.bottomStatus = 'pull';
                    this.bottomDropped = false;
                }
            },
            handleTouchMove(event) {
                if (this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) {
                    return;
                }
                //如果触点在mint-loadmore之外就退出move事件
                this.currentY = event.touches[0].clientY;
                //this.currentY是move过程中触点的y轴坐标
                let distance = (this.currentY - this.startY) / this.distanceIndex;
                //滑动的距离
                this.direction = distance > 0 ? 'down' : 'up';
                //判断滑动方向
                if (typeof this.topMethod === 'function' && this.direction === 'down' &&
                    this.getScrollTop(this.scrollEventTarget) === 0 && this.topStatus !== 'loading') {
                    //如果滑到了顶部
                    event.preventDefault();//阻止默认事件
                    event.stopPropagation();//阻止事件冒泡
                    if (this.maxDistance > 0) {
                        this.translate = distance <= this.maxDistance ? distance - this.startScrollTop : this.translate;
                    } else {
                        this.translate = distance - this.startScrollTop;
                        //随着滑动来更新translate值，translate值变化，计算属性transform就随之变化，content盒子就在y轴上向下移动
                    }
                    if (this.translate < 0) {//刚滑到顶部滑不动，会顿一下
                        this.translate = 0;
                    }
                    this.topStatus = this.translate >= this.topDistance ? 'drop' : 'pull';
                    //topDistance默认70，拉动距离超过70下方箭头就变个方向
                }
                if (this.direction === 'up') {//如果是向上滑动，那就是底部加载，就判断是否已经滑到底部
                    this.bottomReached = this.bottomReached || this.checkBottomReached();
                }
                if (typeof this.bottomMethod === 'function' && this.direction === 'up' &&
                    this.bottomReached && this.bottomStatus !== 'loading' && !this.bottomAllLoaded) {
                    //如果拉到底部了且数据没有加载完
                    event.preventDefault();//阻止默认事件
                    event.stopPropagation();//阻止事件冒泡
                    if (this.maxDistance > 0) {
                        this.translate = Math.abs(distance) <= this.maxDistance
                            ? this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance : this.translate;
                    } else {
                        this.translate = this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance;
                        //随着滑动来更新translate值，translate值变化，计算属性transform就随之变化，content盒子就在y轴上向上移动
                    }
                    if (this.translate > 0) {//刚滑到底部滑不动，会顿一下
                        this.translate = 0;
                    }
                    this.bottomStatus = -this.translate >= this.bottomDistance ? 'drop' : 'pull';
                    //bottomDistance默认70，拉动距离超过70下方箭头就变个方向
                }
                this.$emit('translate-change', this.translate);//触发父组件事件，这个是上拉刷新的时候用的
            },
            handleTouchEnd() {
                if (this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0 && this.translate > 0) {
                    //下拉刷新
                    this.topDropped = true;//drop状态变更，content添加is-dropped样式，回到原点动画
                    if (this.topStatus === 'drop') {
                        this.translate = '50';
                        this.topStatus = 'loading';
                        this.topMethod();
                        //如果topStatus还是drop状态，说明刚放手，那就让content回到距离顶部50px的地方，然后改变topStatus为loading，然后执行父组件加载新数据的方法
                    } else {
                        this.translate = '0';
                        this.topStatus = 'pull';
                        //如果没有从超过70的地方释放，那就回到初始状态，不加载新数据
                    }
                }
                if (this.direction === 'up' && this.bottomReached && this.translate < 0) {
                    //底部加载
                    this.bottomDropped = true;//drop状态变更，content添加is-dropped样式，回到原点动画
                    this.bottomReached = false;//改变是否到达底部状态
                    if (this.bottomStatus === 'drop') {
                        this.translate = '-50';
                        this.bottomStatus = 'loading';
                        this.bottomMethod();
                        //如果bottomStatus还是drop状态，说明刚放手，那就让content回到距离底部50px的地方，然后改变bottomStatus为loading，然后执行父组件加载新数据的方法
                    } else {
                        this.translate = '0';
                        this.bottomStatus = 'pull';
                        //如果没有从超过70的地方释放，那就回到初始状态，不加载新数据
                    }
                }
                this.$emit('translate-change', this.translate);//触发父组件事件，这个是上拉刷新的时候用的
                this.direction = '';//清空方向
            }
        },
        mounted() {//mounted的时候调用init()初始化组件状态
            this.init();
        }
    };
</script>
