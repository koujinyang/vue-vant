import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Home from '@/components/Home'
import Our from '@/components/Our'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
        { path: '/our', name: 'Our', component: Our },
        // { path: '/myFeipei', name: 'Feipei', component: Feipei },

      ]
    }
  ]
})
