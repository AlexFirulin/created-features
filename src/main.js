import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

Vue.component('vue-slider', VueSlider);

new Vue({
  render: h => h(App),
}).$mount('#app');
