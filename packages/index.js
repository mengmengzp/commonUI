/**
 * @file: 组件导出入口文件
 * @author:  Lvmengmeng
 */
import Upload from './upload/index';

const components = [
    Upload
];
const install = (Vue) => {
    if (install.installed) {
        return;
    }
    components.map(component => Vue.component(component.name, component));
};
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    Upload
};
