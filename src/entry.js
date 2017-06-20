import Vue from 'vue'
import App from './App'
import Cell from 'vt-cell'
import http from 'vue-http'
import Alert from 'vt-alert'
import router from './router'
import Loading from 'vt-loading'
import datePicker from 'components/datePicker'
import picker from 'components/picker'

Vue.use(http, {
    root: process.env.API_ROOT,
    timeout: 150000,
    loading: (bool) => {
        Vue.loading(bool)
    },
    error: (text) => Vue.alert({ text })
})

Vue.component('Cell', Cell)
Vue.component('Alert', Alert)
Vue.component('Loading', Loading)
Vue.component('picker', picker)
Vue.component('datePicker', datePicker)


new Vue({
    router,
    ...App
}).$mount('#app')