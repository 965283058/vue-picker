export default {
    '/': {
        meta: {
            title: '组件测试'
        },
        component: (resolve) => {
            require(['pages/picker'], resolve)
        }
    }
}
