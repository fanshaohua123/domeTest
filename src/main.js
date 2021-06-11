import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import Router from 'vue-router';
import router from './router';
import axios from 'axios';
Vue.prototype.axios = axios;
// 左边工具栏以及编辑节点的样式
import 'bpmn-js/dist/assets/diagram-js.css' 
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
// 右边工具栏样式
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css' 
//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
Vue.use(Antd);
Vue.use(Router);
Vue.config.productionTip = false
import store from './store';
Vue.mixin({
  created(){
    if(this.$options.router){
      Vue.prototype.$routers=this.$options.router
    }
  }
})
new Vue({
  render: h => h(App),
  store,
  router,
  
}).$mount('#app')
