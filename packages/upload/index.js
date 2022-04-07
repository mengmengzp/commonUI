/**
 * @file: upload组件导出
 * @author:  LvMengmeng
 */
import Upload from './src/upload';
Upload.install = (Vue) => {
    Vue.component(Upload.name, Upload);
};

export default Upload;
