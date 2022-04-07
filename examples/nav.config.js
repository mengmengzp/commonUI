const navConfig = {
    component: [{
        name: '基础组件',
        path: '/component',
        groups: [{
            path: '/demo',
            title: 'Demo'
        }]
    }, {
        name: '高级组件',
        path: '/component',
        groups: [
            {
                path: '/upload',
                title: '图片上传'
            }
        ]
    }, {
        name: '业务模板',
        path: '/component',
        groups: [
            {
                path: '/calendar',
                title: '日历筛选'
            }
        ]
    }]
};

export {navConfig};