import { OpBridge } from '@/utils/opbridge';
import VConsole from 'vconsole';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'vant/lib/checkbox-group/style';
import 'vant/lib/divider/style';
import 'vant/lib/button/style';
import 'vant/lib/cell-group/style';
import 'vant/lib/tab/style';
import 'vant/lib/switch/style';
import 'vant/lib/row/style';
import 'vant/lib/col/style';

import {
  Checkbox,
  CheckboxGroup,
  Divider,
  Cell,
  CellGroup,
  Field,
  Button,
  Tab,
  Tabs,
  Switch,
  Row,
  SwitchCell,
  Toast,
  Col,
} from 'vant';

Vue.use(Checkbox)
  .use(CheckboxGroup)
  .use(Divider)
  .use(Cell)
  .use(Field)
  .use(Button)
  .use(Tabs)
  .use(Tab)
  .use(Row)
  .use(Col)
  .use(SwitchCell)
  .use(Toast)
  .use(Switch)
  .use(CellGroup);

// 挂载 OpBridge
Vue.prototype.OpBridge = OpBridge;

// 移动端调试Console，build时最好手动注释
// eslint-disable-next-line no-new
new VConsole();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
