import Vue from 'vue'
import App from './App'
import Cell from 'vt-cell'
import http from 'vue-http'
import Alert from 'vt-alert'
import router from './router'
import Loading from 'vt-loading'
import datePicker from 'components/datePicker'
import picker from 'components/picker'
import datetimePicker from 'components/datetimePicker'

let baseOn=Vue.prototype.$on
let baseOnce=Vue.prototype.$once
let baseEmit=Vue.prototype.$emit

Vue.prototype.$on=function () {
    var args=Array.prototype.slice.call(arguments,0)
    console.info('$on',args)
    baseOn.apply(this,args)
}
Vue.prototype.$once=function () {
    var args=Array.prototype.slice.call(arguments,0)
    console.info('$once',args)
    baseOnce.apply(this,args)
}

Vue.prototype.$emit=function () {
    var args=Array.prototype.slice.call(arguments,0)
    console.info(args)
    baseEmit.apply(this,args)
}


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
Vue.component('datetimePicker', datetimePicker)

new Vue({
    router,
    ...App
}).$mount('#app')