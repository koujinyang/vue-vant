// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible'
import {Button,Cell, CellGroup,Form ,Field,Toast,Tabbar,TabbarItem,Swipe, SwipeItem,Lazyload,Grid, GridItem} from 'vant'

Vue.use(Button).use(Cell).use(CellGroup).use(Form).use(Field).use(Toast).use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem).use(Lazyload).use(Grid).use(GridItem)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
