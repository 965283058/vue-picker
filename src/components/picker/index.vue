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

    .pk__button--tabs {
        height: 0.8rem;
        color: #000;
        border-radius: 0.2rem;
        border: 1px solid #00a0e2; /*no*/
        overflow: hidden;

    }

    .pk__button--tabs span {
        display: inline-block;
        height: 0.8rem;
        font-size: 0.3rem;
        line-height: 0.8rem;
        padding: 0 0.4rem;
        color: #000;

    }

    .pk__button--tabs span.active {
        background: blue;
        color: #fff;
    }

    .pk__body-warp {
        height: 7.8rem;
        width: 10rem;
        transition: transform 0.2s ease-out;
        position: relative;
    }

    .pk__body-header {
        width: 10rem;
        height: 0.8rem;
        display: flex;
        justify-content: space-between;
        font-size: 0.48rem;
        line-height: 0.8rem;
        color: blue;
        background: #ebebeb;;
        float: left;
    }

    .pk__body-header div {
        text-align: center;
        flex: 1;
    }

    .pk__body {
        width: 10rem;
        height: 7rem;
        background: #ffffff;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        float: left;
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
        line-height: 0.5rem;
        font-size: 0.4rem;
        color: #000;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
    }

    .pk__mask {
        width: 100%;
        height: 3rem;
        position: absolute;
        box-sizing: border-box;
        z-index: 10;
    }

    .pk__mask--top {
        top: 0.8rem;
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
        <div @click="showPanel()">
            <slot>
            </slot>
        </div>
        <div class="pkWarp" v-show="vo.show" ref="pk" @click="hidePanel($event)" @touchmove.prevent="">
            <div class="pk">
                <div class="pk__header">
                    <button @click="hidePanel()">取消</button>
                    <div class="pk__button--tabs">
                        <span v-for="(count,tabIndex) in tabLayout" :class="{'active':vo.tabIndex==tabIndex}"
                              @touchstart="changeTab(tabIndex)">第{{tabIndex+1}}页</span>
                    </div>
                    <button @click="submit">确定</button>
                </div>
                <div v-move="move" class="pk__body-warp" ref="body" :style="{transform: vo.domStyle.body}">
                    <div class="pk__mask pk__mask--top"></div>
                    <div class="pk__mask pk__mask--bottom"></div>


                    <div class="pk__body-header" v-for="(count,tabIndex) in tabLayout">
                        <div v-if="canRender(count,tabIndex,index)" v-for="(val, key, index) in vo.data">
                            <span v-if="header[index]">{{header[index]}}</span>
                            <span v-else>{{key}}</span>
                        </div>
                    </div>

                    <div class="pk__body" v-for="(count,tabIndex) in tabLayout" :tabIndex="tabIndex">
                        <div class="pk__body-block" v-if="canRender(count,tabIndex,index)"
                             :type="key" v-for="(items, key, index) in vo.data">
                            <ul class="pk__item-warp" :ref="key" :style="{transform: vo.domStyle[key]}">
                                <li class="pk__item" v-for="item in items">
                                    {{item[textField]}}
                                </li>
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
                    itemIndexs: {},
                },
                vo: {
                    phoneWidth: 375,
                    show: false,
                    tabIndex: 0,
                    domStyle: {
                        "body": 'translate3d(0rem, 0, 0px)',
                    },
                    data: {}
                }
            }
        },
        props: {
            valueField: {
                type: String,
                default: 'id'
            },
            textField: {
                type: String,
                default: 'text'
            },
            header: {
                type: Array,
                default: function () {
                    return []
                }
            },
            "value": {
                type: [Number, String, Object],
            },
            "data": [Array, Object],
            tabLayout: {
                type: Array,
                default: function () {
                    let count = 0 //总条数
                    let tabCount = 3//每页显示几列
                    for (let k in this.data) {
                        count++
                    }
                    let arr = []
                    let pages = Math.ceil(count / tabCount)//总共几页
                    for (let i = 0; i < pages - 1; i++) {
                        arr.push(tabCount)
                    }
                    arr.push(count % tabCount)//最后一页的列数
                    return arr
                }
            }
        },
        computed: {},
        methods: {
            canRender(count, tabIndex, index){ //是否可以渲染该列，用来分第几页
                let max = 0, min = 0;
                for (let i = 0; i <= tabIndex; i++) {
                    if (i < tabIndex) {
                        min += this.tabLayout[i]
                    }
                    max += this.tabLayout[i]
                }
                return min <= index && index < max
            },
            showPanel()//显示面板
            {
                this.vo.show = true
                this.$refs.pk.classList.add("pk--show")
            },
            hidePanel(e)//隐藏面板
            {
                if (e && e.target.className.indexOf("pkWarp") == -1) {
                    return
                }
                let list = this.$refs.pk.classList
                list.remove("pk--show")
                list.add("pk--hide")
                setTimeout(()=> {
                    this.vo.show = false
                    list.remove("pk--hide")
                }, 200)
            },
            changeTab(index)//改变面板时候的操作
            {
                let x = index * 10 * -1
                this.vo.domStyle.body = `translate3d(${x}rem, 0px, 0px)`
                this.vo.tabIndex = index
            },
            move(e)//手指移动
            {
                if (Math.abs(e.pos.x) - Math.abs(e.pos.y) > 0) {//判断是否是X轴滑动
                    return
                }

                let items = this.$refs.body.querySelector(`div[tabindex="${this.vo.tabIndex}"]`).querySelectorAll('.pk__body-block')//获取当前面板的可滑动列

                let blockWidth = this.vo.phoneWidth / items.length  //获取每列的宽度

                let index = Math.floor(e.beginPos.x / blockWidth)//获取当前操作是在第几列

                let key = items[index].getAttribute('type')//获取当前滑动列的Key

                this.changeItem(e, key)
            },
            /*
             * 某一项按Y轴滚动的处理
             * */
            changeItem(e, type) {
                if (!type || this.vo.data[type].length == 0) {
                    return
                }
                let index = 0//当前滑动列选择的选项的索引
                let el = this.$refs[type][0];//当前滑动块
                let translateY = this.getTranslateY(el)
                translateY += ( e.pos.y / 35)
                if (e.end) { //如果手指离开屏幕 设置当前滑动块的整数的Y轴偏移
                    translateY = Math.round(translateY)
                    index = Math.abs(translateY - 3)
                }

                this.vo.domStyle[type] = `translate3d(0px, ${translateY}rem, 0px)`//设置当前滑动块的Y轴偏移
                if (translateY > 3 && e.end) {//如果手指离开屏幕并且滑过了第一个选项
                    this.vo.domStyle[type] = `translate3d(0px,3rem, 0px)`
                    index = 0
                }

                let min = -(this.vo.data[type].length - 4)//最后一个选项的Y轴偏移

                if (e.end && min > translateY) {//如果手指离开屏幕并且滑过了最后一个选项
                    this.vo.domStyle[type] = `translate3d(0px, ${min}rem, 0px)`
                    index = this.vo.data[type].length - 1
                }
                if (e.end && this.po.itemIndexs[type] != index) {//如果手指离开屏幕并且选中项发生了改变
                    this.po.itemIndexs[type] = index
                    this.$emit("change", type, this.vo.data[type][index], index)
                    this.afterOptionToTop(type)
                }
            },

            /*
             * 当前选择项改变后，当前列后面的所用列全部滚动到第一个选项
             * */
            afterOptionToTop(type){
                let change = false
                for (let key in this.vo.data) {
                    if (change) {
                        this.vo.domStyle[key] = `translate3d(0px,3rem, 0px)`
                    }
                    if (key == type) {
                        change = true
                    }
                }
            },

            /*
             * 获取当前元素的Y轴偏移量（兼容处理）
             * */
            getTranslateY(el){
                let css = el.style['transform'] || el.style['-webkit-transform'] || el.style['-ms-transform'] || el.style["-moz-transform"] || el.style["-o-transform"]
                return parseFloat(css.replace("translate3d(0px,", '').replace("rem, 0px)", ''))
            },

            /*
             * 获取当前元素的X轴偏移量（兼容处理）
             * */
            getTranslateX(){
                let el = this.$refs.body
                let css = el.style['transform'] || el.style['-webkit-transform'] || el.style['-ms-transform'] || el.style["-moz-transform"] || el.style["-o-transform"]
                return parseFloat(css.replace("translate3d(", '').replace("rem,0px, 0px)", ''))

            },


            /*
             * 滚动到指定的数据
             * */
            syncTranslateY(){
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

            initBlockPostion(){//初始化面板数据
                for (var type in this.vo.data) {
                    if (!this.vo.domStyle[type]) {
                        this.$set(this.vo.domStyle, type, `translate3d(0px,3rem, 0px)`)
                        this.$set(this.po.itemIndexs, type, 0)
                    }
                }
            },
            submit(){//点击确定按钮
                let map = {}, value = null
                for (let k in this.vo.data) {
                    map[k] = this.vo.data[k][this.po.itemIndexs[k]]
                    if (map[k]) {//防止无数据
                        value = map[k][this.valueField]
                    }
                }
                this.$emit("input", value, map)
                this.hidePanel()
            }
        },
        mounted: function () {
            this.vo.phoneWidth = window.document.documentElement.clientWidth || window.body.clientWidth
            this.$refs.body.style.width = `${this.tabLayout.length * 10}rem`
            this.initBlockPostion()
            this.showPanel()
        },
        watch: {
            data: {
                handler: function (val) {
                    this.vo.data = val
                    this.initBlockPostion()
                },
                deep: true
            }
        }
    }
</script>
