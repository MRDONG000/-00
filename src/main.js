import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'lib-flexible/flexible'
import axios from 'axios'
Vue.prototype.axios = axios;

import { Tabbar, TabbarItem,Search,Icon,Tab, Tabs,Lazyload,Swipe, SwipeItem,Divider,Pagination,Toast,CountDown,List,Overlay,Popup,Slider,Button,Sidebar, SidebarItem,Empty,NavBar,Rate,Cell, CellGroup,Switch,Form, Field,Checkbox, CheckboxGroup,Popover,Dialog       } from 'vant';
Vue
  .use(Tabbar)
  .use(Dialog)
  .use(TabbarItem)
  .use(Search)
  .use(Icon)
  .use(Tab)
  .use(Tabs)
  .use(Lazyload)
  .use(Swipe)
  .use(SwipeItem)
  .use(Divider)
  .use(Pagination)
  .use(Toast)
  .use(CountDown)
  .use(List)
  .use(Overlay)
  .use(Popup)
  .use(Slider)
  .use(Button)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Empty)
  .use(NavBar)
  .use(Rate)
  .use(Cell)
  .use(CellGroup)
  .use(Switch)
  .use(Form)
  .use(Field)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Popover)


Vue.config.productionTip = false
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  Toast.clear()
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
