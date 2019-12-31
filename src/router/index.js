import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/home/Index'
import ArticlDdetail from '@/components/centeral/article/ArticlDdetail'

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
      component: ArticlDdetail
    }
  ]
})
