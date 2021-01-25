import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/global.less'
Vue.config.productionTip = false

import {
  NoticeBar,
  Icon,
  Area,
  Popup,
  Toast,
  Dialog
} from 'vant';

Vue.use(NoticeBar);
Vue.use(Icon);
Vue.use(Popup);
Vue.use(Area);
Vue.use(Dialog);
Vue.prototype.Toast = Toast;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')