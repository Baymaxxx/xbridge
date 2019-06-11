import { Button, Cell } from 'mint-ui';
import { OpBridge } from '@/utils/opbridge';
import VConsole from 'vconsole';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'mint-ui/lib/style.css';

// 挂载 OpBridge
Vue.prototype.OpBridge = OpBridge;

// 移动端调试Console，build时最好手动注释
// eslint-disable-next-line no-new
new VConsole();

Vue.use(Button);
Vue.use(Cell);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
