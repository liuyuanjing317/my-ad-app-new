import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/home/Index'
import ArticleDetail from '@/components/centeral/article/ArticleDetail'
import AdDetail from '@/components/centeral/ad/AdDetail'
import AdEdit from '@/components/centeral/ad/AdEdit'
import AdList from '@/components/centeral/ad/AdList'
import Login from '@/components/centeral/login/Login'
import loadMore from '@/components/centeral/article/loadMore'




Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/articleDetail',
      name: 'articleDetail',
      component: ArticleDetail
    },
    {
      path: '/adDetail',
      name: 'adDetail',
      component: AdDetail
    },
    {
      path: '/adEdit',
      name: 'adEdit',
      component: AdEdit
    }, {
      path: '/adList',
      name: 'adList',
      component: AdList
    },
    {
      path: '/loadMore',
      name: 'loadMore',
      component: loadMore
    }
    ,
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
