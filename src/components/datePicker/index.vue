<style scoped>
    .pkWarp {
        width: 100%;
        height: calc(100% + 9rem);
        background: black;
        position: fixed;
        top: 0;
        left: 0;
        opacity: 0;
        overflow: hidden;
        z-index: 10;
    }

    .pk {
        height: 9rem;
        width: 100%;
        position: absolute;
        bottom: 0;
        z-index: 100;

    }

    .pk--show {
        animation: moveTop 0.5s ease-in;
        animation-fill-mode: forwards;
    }

    .pk--hide {
        animation: moveBottom 0.5s ease-out;
        animation-fill-mode: forwards;
    }

    @keyframes moveTop {
        from {
            transform: translate(0, 0);
            opacity: 0;
        }
        to {
            transform: translate(0, -9rem);
            opacity: 0.5;
        }
    }

    @keyframes moveBottom {
        from {
            transform: translate(0, -8rem);
            opacity: 0.5;
        }
        to {
            transform: translate(0, 0);
            opacity: 0;
        }
    }

    .pk__header {
        height: 1.2rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #ebebeb;
        padding: 0 0.2rem;
        border-bottom: 1px solid #8d8d8d;
        box-sizing: border-box;
    }

    .pk__header button {
        height: 0.8rem;
        background: blue;
        color: white;
        font-size: 0.4rem;
        border-radius: 0.2rem;
        padding: 0 .4rem;
        border: 1px solid #00a0e2; /*no*/
    }

    .pk__button--datetime {
        height: 0.8rem;
        color: #000;
        border-radius: 0.2rem;
        border: 1px solid #00a0e2; /*no*/
        overflow: hidden;

    }

    .pk__button--datetime span {
        display: inline-block;
        height: 0.8rem;
        font-size: 0.3rem;
        line-height: 0.8rem;
        padding: 0 0.4rem;
        color: #000;

    }

    .pk__button--datetime span.active {
        background: blue;
        color: #fff;
    }

    .pk__body-warp {
        height: 7.8rem;
        width: 20rem;
        transition: transform 0.2s ease-out;
    }

    .pk__body-header {
        width: 100%;
        height: 0.8rem;
        display: flex;
        justify-content: space-between;
        font-size: 0.48rem;
        line-height: 0.8rem;
        color: blue;
        background: #ebebeb;;
    }

    .pk__body-header div {
        text-align: center;
        flex: 1;
    }

    .pk__body {
        width: 100%;
        height: 7rem;
        background: #ffffff;
        overflow: hidden;
        position: relative;
        display: flex;
        justify-content: space-between;
    }

    .pk__body-block {
        flex: 1;
    }

    .pk__item-warp {
        height: 100%;
        width: 100%;
        list-style: none;
        margin: 0;
        padding: 0;
        transition: transform 0.15s ease-out;
    }

    .pk__item {
        width: 100%;
        height: 1rem;
        text-align: center;
        line-height: 1rem;
        font-size: 0.6rem;
        color: #000;
    }

    .pk__mask {
        width: 100%;
        height: 3rem;
        position: absolute;
        box-sizing: border-box;
        z-index: 10;
    }

    .pk__mask--top {
        top: 0rem;
        border-bottom: 1px solid #4c4c4c; /*no*/
        background: linear-gradient(to bottom, #FFF, rgba(255, 255, 255, 0));
    }

    .pk__mask--bottom {
        bottom: 0rem;
        border-top: 1px solid #4c4c4c; /*no*/
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #FFF);
    }
</style>
<template>
    <div>
        <input type="text" readonly="readonly" :value="value" @click="showPanel()">
        <div class="pkWarp" v-show="vo.show" ref="pk" @click="hidePanel($event)" @touchmove.prevent="">
            <div class="pk">
                <div class="pk__header">
                    <button @click="hidePanel()">取消</button>
                    <div class="pk__button--datetime">
                        <span :class="{'active':vo.tabIndex==0}" @touchstart="changeTab(0)">日期</span>
                        <span :class="{'active':vo.tabIndex==1}" @touchstart="changeTab(1)">时间</span>
                    </div>

                    <button @click="submit">确定</button>
                </div>
                <div v-move="move" class="pk__body-warp" :style="{transform: vo.domStyle.body}">
                    <div class="pk__body-header">
                        <div>年</div>
                        <div>月</div>
                        <div>日</div>

                        <div>时</div>
                        <div>份</div>
                        <div>秒</div>

                    </div>
                    <div class="pk__body" ref="body">
                        <div class="pk__mask pk__mask--top"></div>
                        <div class="pk__mask pk__mask--bottom"></div>
                        <div class="pk__body-block" v-show="vo.show.year">
                            <ul class="pk__item-warp" ref="year" :style="{transform: vo.domStyle.year}">
                                <li class="pk__item" v-for="year in vo.yearArray">{{year}}</li>
                            </ul>
                        </div>
                        <div class="pk__body-block">
                            <ul class="pk__item-warp" ref="month" :style="{transform: vo.domStyle.month}">
                                <li class="pk__item" v-for="month in vo.monthArray">{{month}}</li>
                            </ul>
                        </div>
                        <div class="pk__body-block">
                            <ul class="pk__item-warp" ref="day" :style="{transform: vo.domStyle.day}">
                                <li class="pk__item" v-for="day in vo.dayArray">{{day}}</li>
                            </ul>
                        </div>
                        <div class="pk__body-block">
                            <ul class="pk__item-warp" ref="hours" :style="{transform: vo.domStyle.hours}">
                                <li class="pk__item" v-for="hours in vo.hoursArray">{{hours}}</li>
                            </ul>
                        </div>
                        <div class="pk__body-block">
                            <ul class="pk__item-warp" ref="minutes" :style="{transform: vo.domStyle.minutes}">
                                <li class="pk__item" v-for="minutes in vo.minutesArray">{{minutes}}</li>
                            </ul>
                        </div>
                        <div class="pk__body-block">
                            <ul class="pk__item-warp" ref="seconds" :style="{transform: vo.domStyle.seconds}">
                                <li class="pk__item" v-for="seconds in vo.secondsArray">{{seconds}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import moveDirective from './directive'
    Vue.directive("move", moveDirective)
    export default {
        data: function () {
            return {
                po: {
                    year: 0,
                    month: 0,
                    day: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                },
                vo: {
                    phoneWidth: 375,
                    show: false,
                    tabIndex: 0,
                    yearArray: [],
                    monthArray: [],
                    dayArray: [],
                    hoursArray: [],
                    minutesArray: [],
                    secondsArray: [],
                    domStyle: {
                        "year": 'translate3d(0px, 3rem, 0px)',
                        "month": 'translate3d(0px, 3rem, 0px)',
                        "day": 'translate3d(0px, 3rem, 0px)',
                        "hours": 'translate3d(0px, 3rem, 0px)',
                        "minutes": 'translate3d(0px, 3rem, 0px)',
                        "seconds": 'translate3d(0px, 3rem, 0px)',
                        "body": 'translate3d(0rem, 0, 0px)',
                    },
                    show: {
                        "year": false,
                        "month": false,
                        "day": false,
                        "hours": false,
                        "minutes": false,
                        "seconds": false
                    }
                }
            }
        },
        props: {
            "value": {
                type: [Number, String, Object],
                default: function () {
                    new Date()
                },
                validator: function (value) {
                    if (typeof value === "number") {
                        return true
                    } else if (typeof value === "object" && value instanceof Date) {
                        return true
                    } else if (typeof value === "string") {
                        var reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
                        if (!reg.test(value)) {
                            console.error("时间格式不正确,正确格式为: 2014-01-01 12:00:00 ");
                            return false
                        }
                        return true
                    }
                }
            },
            type: {
                type: String,
                default: 'yyyy-MM-dd hh:mm:ss',
                validator: function (value) {
                    return true
                }
            }
        },
        computed: {
            datetime: function () {
                let value = `${this.po.year}-${this.po.month}-${this.po.day} ${this.po.hours}:${this.po.minutes}:${this.po.seconds}`
                this.$emit('input', value)
                return value
            }
        },
        methods: {
            showPanel()
            {
                this.setDateTime()
                this.vo.show = true
                this.$refs.pk.classList.add("pk--show")
            }
            ,
            hidePanel(e)
            {
                if (e) {
                    if (e.target.className.indexOf("pkWarp") == -1) {
                        return
                    }
                }
                let list = this.$refs.pk.classList
                list.remove("pk--show")
                list.add("pk--hide")
                setTimeout(()=> {
                    this.vo.show = false
                    list.remove("pk--hide")
                }, 500)
            },
            changeTab(index)
            {
                let x = index * 10 * -1
                this.vo.domStyle.body = `translate3d(${x}rem, 0px, 0px)`
                this.vo.tabIndex = index
            },
            move(e)
            {
                if (Math.abs(e.pos.x) - Math.abs(e.pos.y) > 0) {
                    return
                }
                let type = ''
                let blockWidth = this.vo.phoneWidth / 3

                if (e.beginPos.x < blockWidth) {
                    type = this.vo.tabIndex == 0 ? "year" : "hours"
                } else if (e.beginPos.x < blockWidth * 2) {
                    type = this.vo.tabIndex == 0 ? "month" : "minutes"
                } else {
                    type = this.vo.tabIndex == 0 ? "day" : "seconds"
                }
                this.changeItem(e, type)
            }
            ,

            changeItem(e, type) {
                if (!type) {
                    return
                }
                let index = 0
                let el = this.$refs[type];
                let translateY = this.getTranslateY(el)
                translateY += ( e.pos.y / 35)

                Math.abs(translateY - 3)

                if (e.end) {
                    translateY = Math.round(translateY)
                    index = Math.abs(translateY - 3)
                }

                this.vo.domStyle[type] = `translate3d(0px, ${translateY}rem, 0px)`

                if (translateY > 3 && e.end) {
                    this.vo.domStyle[type] = `translate3d(0px,3rem, 0px)`
                    index = 0
                }

                let min = -(this.vo[type + "Array"].length - 4)
                if (e.end && min > translateY) {
                    this.vo.domStyle[type] = `translate3d(0px, ${min}rem, 0px)`
                    index = this.vo[type + "Array"].length - 1
                }
                if (e.end && index >= 0 && index < this.vo[type + "Array"].length) {
                    this.po[type] = this.vo[type + "Array"][parseInt(index)]
                    if (type != "day") {
                        this.getDayArray()
                    }
                }
            },

            getTranslateY(el){
                let css = el.style['transform'] || el.style['-webkit-transform'] || el.style['-ms-transform'] || el.style["-moz-transform"] || el.style["-o-transform"]
                return parseFloat(css.replace("translate3d(0px,", '').replace("rem, 0px)", ''))
            },

            getDayArray() {//获取天数
                let dayLength = 0;
                switch (parseInt(this.po.month, 10)) {
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                    case 8:
                    case 10:
                    case 12:
                        dayLength = 31
                        break
                    case 2:
                        if (this.po.year % 100 == 0 && this.po.year % 400 == 0) {
                            dayLength = 29
                        } else if (this.po.year % 4 == 0) {
                            dayLength = 29
                        } else {
                            dayLength = 28
                        }
                        break
                    default:
                        dayLength = 30
                        break
                }
                let tempArr = []
                for (let i = 1; i <= dayLength; i++) {
                    tempArr.push(this.padLeft(i))
                }
                this.vo.dayArray = tempArr;


                let translateY = this.getTranslateY(this.$refs.day)
                let min = -(tempArr.length - 4)
                if (min > translateY) {
                    this.vo.domStyle.day = `translate3d(0px, ${min}rem, 0px)`
                    this.po.day = this.vo.dayArray[this.vo.dayArray.length - 1]
                }
            },

            initPanelDate() { //初始化数据
                for (let i = 1970; i <= new Date().getFullYear(); i++) {
                    this.vo.yearArray.push(i)
                }
                for (let i = 1; i <= 12; i++) {
                    this.vo.monthArray.push(this.padLeft(i))
                }
                for (let i = 1; i <= 30; i++) {
                    this.vo.dayArray.push(this.padLeft(i))
                }

                for (let i = 0; i <= 23; i++) {
                    this.vo.hoursArray.push(this.padLeft(i))
                }

                for (let i = 0; i <= 59; i++) {
                    this.vo.minutesArray.push(this.padLeft(i))
                }

                for (let i = 0; i <= 59; i++) {
                    this.vo.secondsArray.push(this.padLeft(i))
                }
            },
            setDateTime(){ //设置时间
                let date = null
                if (typeof this.value == 'number') {
                    date = new Date(this.value)
                } else if (typeof this.value == 'string') {
                    date = new Date(Date.parse(this.value.trim().replace(/-/g, "/")))
                } else if (this.value instanceof Date) {
                    date = this.value
                } else {
                    return console.error("Init DateTime error")
                }

                this.po.year = date.getFullYear()
                this.po.month = this.padLeft(date.getMonth() + 1)
                this.getDayArray()
                this.po.day = this.padLeft(date.getDate())
                this.po.hours = this.padLeft(date.getHours())
                this.po.minutes = this.padLeft(date.getMinutes())
                this.po.seconds = this.padLeft(date.getSeconds())
                this.syncTranslateY()
            },

            syncTranslateY(){  //滚动到指定的数据
                for (let key in this.po) {
                    for (let i = 0; i < this.vo[key + "Array"].length; i++) {
                        if (parseInt(this.vo[key + "Array"][i]) == parseInt(this.po[key])) {
                            this.vo.domStyle[key] = `translate3d(0px, ${(3 - i)}rem, 0px)`
                            break
                        }
                    }
                }
            },
            padLeft(value, length = 2, char = '0'){//大爷的三星S5在babel转码后的padStart的运行中报错
                value = value + '';
                if (value.length < length) {
                    for (let i = value.length; i < length; i++) {
                        value = char + value
                    }
                }
                return value
            },
            submit(){
                this.$emit("input", this.datetime)
                this.hidePanel()
            }
        },
        mounted: function () {
            this.vo.phoneWidth = window.document.documentElement.clientWidth || window.body.clientWidth
            this.initPanelDate()
            this.setDateTime()
        }
    }


</script>
