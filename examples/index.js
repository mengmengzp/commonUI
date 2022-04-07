import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles/test-stylus.styl';
import './assets/icon/iconfont.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import EcosUI from '../packages/index';
import DemoBlock from './components/demo-block.vue';
import 'highlight.js/styles/atom-one-dark.css';
Vue.use(ElementUI);
Vue.use(EcosUI);
Vue.component('demo-block', DemoBlock);

new Vue({
    router,
    render: h => h(App)
}).$mount('#ecos');
