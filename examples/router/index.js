import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// 左侧导航菜单
const navConfig = ['upload'];
const routesParams = [{path: '/', redirect: '/component/upload'}];

navConfig.forEach((item) => {
    const obj = {};
    obj.path = '/component/' + item;
    obj.component = r => require.ensure([], () => r(require('../docs/' + item + '.md')));
    routesParams.push(obj);
});
export default new Router({
    routes: routesParams
});