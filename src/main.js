// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible'
import {Button,Cell, CellGroup,Form ,Field,Toast,Tabbar,TabbarItem,Swipe, SwipeItem,Lazyload,Grid, GridItem,Popup ,Area ,Icon,NavBar,Search ,List,PullRefresh  ,Checkbox, CheckboxGroup,Picker, Col, Row ,Dialog} from 'vant'

Vue.use(Button).use(Cell).use(CellGroup).use(Form).use(Field).use(Toast).use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem).use(Lazyload).use(Grid).use(GridItem).use(Popup).use(Area).use(Icon).use(NavBar).use(Search).use(List).use(PullRefresh).use(Checkbox).use(CheckboxGroup).use(Picker).use(Col).use(Row).use(Dialog)
import './assets/icon/iconfont.css'
import { Image as VanImage } from 'vant';
import axios from 'axios'
import {fetchGet, fetchPost} from './https'
// import cryptoJs from 'crypto-js'
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
// Vue.prototype.$cryptoJs = cryptoJs;
Vue.prototype.$axios = axios
Vue.prototype.fetchGet = fetchGet
Vue.prototype.fetchPost = fetchPost
Vue.use(VanImage);

Vue.config.productionTip = false
window.addEventListener('popstate', function (e) {
  router.isBack = true
},false)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
