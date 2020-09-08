import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/components/Start'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Home from '@/components/Home'
import Work from '@/components/Work'
import My from '@/components/My'
import Fenpei from '@/components/Fenpei'
import Anyuan from '@/components/Anyuan'
import SetFuban from '@/components/SetFuban'
import MyInformation from '@/components/MyInformation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: "/index",
      name: "Index",
      component: Index,
      redirect:'/home',
      children:[
        { path: '/home', name: 'Home', component: Home },
        { path: '/my', name: 'My', component: My },
        { path: '/work', name: 'Work', component: Work },
        // { path: '/myFeipei', name: 'Feipei', component: Feipei },

      ]
    },
    {
      path: '/fenpei/:id',
      name: 'Fenpei',
      component: Fenpei
    },
    {
      path: '/anyuan/:id',
      name: 'Anyuan',
      component: Anyuan
    },
    {
      path: '/setfuban/:id',
      name: 'SetFuban',
      component: SetFuban
    },
    {
      path: '/myInformation/:id',
      name: 'MyInformation',
      component: MyInformation
    }
  ]
})
