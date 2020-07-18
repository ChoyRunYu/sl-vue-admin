import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/performance',
    children: [{
      path: 'performance',
      name: 'Performance',
      component: () => import('@/views/performance/index'),
      meta: { title: '网站运行情况', icon: 'server' }
    }]
  },
  {
    path: '/banner',
    component: Layout,
    redirect: '/banner/bannerManage',
    children: [{
      path: 'bannerManage',
      name: 'BannerManage',
      component: () => import('@/views/bannerManage/index'),
      meta: { title: '海报轮播图管理', icon: 'banner' }
    }]
  },
  {
    path: '/news',
    component: Layout,
    redirect: '/news/newsManage',
    children: [{
      path: 'newsManage',
      name: 'NewsManage',
      component: () => import('@/views/newsManage/index'),
      meta: { title: '新闻资讯管理', icon: 'news' }
    }]
  },
  {
    path: '/video',
    component: Layout,
    redirect: '/video/videoManage',
    name: 'video',
    meta: { title: '微视频管理', icon: 'video' },
    children: [{
      path: 'uploadVideo',
      name: 'UploadVideo',
      component: () => import('@/views/video/uploadVideo/index'),
      meta: { title: '上传视频', icon: 'upload' }
    },
    {
      path: 'videoManage',
      name: 'VideoManage',
      component: () => import('@/views/video/videoManage/index'),
      meta: { title: '视频管理', icon: 'videoManage' }
    }]
  },
  {
    path: '/association',
    component: Layout,
    redirect: '/association/associationManage',
    name: 'association',
    meta: { title: '社团管理', icon: 'association' },
    children: [{
      path: 'catagoryManage',
      name: 'CatagoryManage',
      component: () => import('@/views/association/catagoryManage/index'),
      meta: { title: '社团类别管理', icon: 'catagory' }
    },
    {
      path: 'associationManage',
      name: 'AssociationManage',
      component: () => import('@/views/association/associationManage/index'),
      meta: { title: '社团信息管理', icon: 'associationManage' }
    }]
  },
  {
    path: '/pwd',
    component: Layout,
    redirect: '/pwd/updatePwd',
    children: [{
      path: 'updatePwd',
      name: 'UpdatePwd',
      component: () => import('@/views/updatePwd/index'),
      meta: { title: '修改密码', icon: 'password' }
    }]
  }
]

export const asyncRoutesMap = [
  {
    path: '/aboutus',
    component: Layout,
    redirect: '/aboutus/aboutusManage',
    meta: { title: '魅力社联管理', icon: 'aboutus', role: ['admin', 'minister'] },
    children: [{
      path: 'aboutusManage',
      name: 'AboutusManage',
      component: () => import('@/views/aboutus/aboutusManage/index'),
      meta: { title: '魅力社联页面管理', icon: 'nested', role: ['admin', 'minister'] }
    },
    {
      path: 'aboutusIndex',
      name: 'AboutusIndex',
      component: () => import('@/views/aboutus/aboutusIndex/index'),
      meta: { title: '关于我们主页管理', icon: 'aboutusIndex', role: ['admin', 'minister'] }
    }]
  },
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/activityManage',
    children: [{
      path: 'activityManage',
      name: 'ActivityManage',
      component: () => import('@/views/activityManage/index'),
      meta: { title: '近期活动管理', icon: 'activity', role: ['admin', 'minister'] }
    }]
  },
  {
    path: '/service',
    component: Layout,
    redirect: '/service/serviceManage',
    children: [{
      path: 'serviceManage',
      name: 'ServiceManage',
      component: () => import('@/views/serviceManage/index'),
      meta: { title: '服务中心管理', icon: 'service', role: ['admin'] }
    }]
  },
  {
    path: '/complaint',
    component: Layout,
    redirect: 'complaint/index',
    children: [{
      path: 'index',
      name: 'Complaint',
      component: () => import('@/views/complaint/index'),
      meta: { title: '投诉&建议', icon: 'complaint', role: ['admin', 'minister'] }
    }]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/adminManage',
    children: [{
      path: 'adminManage',
      name: 'AdminManage',
      component: () => import('@/views/adminManage/index'),
      meta: { title: '管理员用户管理', icon: 'admin', role: ['admin'] }
    }]
  },
  {
    path: '/webset',
    component: Layout,
    redirect: '/webset/index',
    children: [{
      path: 'index',
      name: 'WebSet',
      component: () => import('@/views/webSet/index'),
      meta: { title: '网站设置', icon: 'webset', role: ['admin'] }
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
