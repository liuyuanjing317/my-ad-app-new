import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/home/Index'
import ArticleDdetail from '@/components/centeral/article/ArticleDdetail'
import AdDetail from '@/components/centeral/ad/AdDetail'

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
      component: ArticleDdetail
    },
    {
      path: '/adDetail',
      name: 'adDetail',
      component: AdDetail
    },
    {
      path: '/loadMore',
      name: 'loadMore',
      component: loadMore
    }
  ]
})
