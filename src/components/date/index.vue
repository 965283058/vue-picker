<style scoped>
    .ui-date__warp {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .ui-date__input {
        display: block;
        padding: 3px 35px 3px 10px;
        width: 100%;
        height: 36px;
        color: #1f2d3d;
        font-size: 14px;
        font-family: "Helvetica Neue", Helvetica, "Microsoft YaHei", SimSun, '\5b8b\4f53', sans-serif;
        outline: none;
        cursor: pointer;
        appearance: none;
        border-radius: 4px;
        background-color: #fff;
        border: 1px solid #c0ccda;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    }

    .ui-date__input--large {
        height: 42px;
        font-size: 16px;
    }

    .ui-date__input--mini {
        height: 30px;
        font-size: 13px;
    }

    .ui-date__input:focus {
        border-color: #20a0ff;
    }

    .ui-date__input::placeholder {
        color: #99a9bf;
    }

    .ui-date__input[disabled] {
        color: #bbb;
        cursor: not-allowed;
        border-color: #d3dce6;
        background-color: #eff2f7;
    }

    .ui-date__icon {
        display: flex;
        position: absolute;
        top: 0;
        right: 0;
        width: 35px;
        height: 100%;
        cursor: pointer;
        align-items: center;
        justify-content: center;
    }

    .ui-date__icon:before {
        content: ' ';
        width: 0;
        height: 0;
        margin-top: 8px;
        border: 6px solid #c0ccda;
        border-right-color: transparent;
        border-left-color: transparent;
        border-bottom-color: transparent;
        transition: transform .3s, margin-top .3s;
    }

    .ui-date__icon--active:before {
        margin-top: -8px;
        transform: rotate(180deg);
    }

    .ui-date_picker {
        position: absolute;
        border: 1px solid #00a0e2;
        width: 210px;
        background: #ffffff;
        z-index: 100;
        margin-top: -1px;
        box-sizing: content-box;
        overflow: hidden;
    }

    .ui-date-enter-active {
        animation-name: fold-in;
        animation-duration: .3s;
        animation-timing-function: ease-in;
    }

    .ui-date-leave-active {
        animation-name: fold-out;
        animation-duration: .3s;
        animation-timing-function: ease-out;
    }

    @keyframes fold-in {
        0% {
            height: 0;
        }
        100% {
            height: 250px;
        }
    }

    @keyframes fold-out {
        0% {
            height: 250px;
        }
        100% {
            height: 0;
        }
    }

    .ui-date__spinner {
        background: #dbe9ff;
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 25px;
    }

    .ui-date__spinner li {
        cursor: pointer;
        margin: 0 5px;
        display: flex;
        align-items: center;
    }

    .ui-date__value {
        width: 100px;
        line-height: 20px;
        justify-content: center;
        padding: 2px 5px;
        border-radius: 5px;
    }

    .ui-date__value:hover {
        background: #e6f0ff;
    }

    .ui-date__spinner--prev {
        display: inline-block;
        width: 5px;
        height: 7px;
        border-color: transparent;
        border-top: 6px solid transparent;
        border-right: 6px solid #000;
        border-bottom: 6px solid transparent;
    }

    .ui-date__spinner--next {
        display: inline-block;
        width: 5px;
        height: 7px;
        border-color: transparent;
        border-top: 6px solid transparent;
        border-left: 6px solid #000;
        border-bottom: 6px solid transparent;
    }

    .ui-date__week {
        list-style: none;
        background: #F2F2F2;
        display: flex;
        justify-content: space-between;
    }

    .ui-date__week li {
        text-align: center;
        flex: 1;
        line-height: 25px;
    }

    .ui-date__days {
        display: flex;
        flex-wrap: wrap;
        padding: 2px;
    }

    .ui-date__day {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 29px;
        height: 29px;
        cursor: pointer;
        box-sizing: border-box;
        border-radius: 4px;
    }

    .ui-date__day--not-curr-month {
        opacity: 0.3;
    }

    .ui-date__day--sunday {
        color: #bc282e;
    }



    .ui-date__day--saturday {
        color: #00ee00;
    }



    .ui-date__day--curr {
        background: #ffe17c;
        border: 1px solid #cc7a00;
    }

    .ui-date__day--disabled{
        cursor: not-allowed;
    }

    .ui-date__months-warp input {
        width: 40px;
        font-weight: 500;
    }

    .ui-date__months-warp .ui-date__spinner {
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
    }

    .ui-date__months {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 6px 5px;
    }

    .ui-date__month {
        width: 50px;
        text-align: center;
        line-height: 48px;
        border-radius: 5px;
        cursor: pointer;
        box-sizing: border-box;
    }

    .ui-date__month:hover {
        background: #e7f0ff;
    }

    .ui-date__month-curr {
        background: #ffe17c;
        border: 1px solid #cc7a00;
    }

    .ui-picker__time {
        height: 24px;
        border: 1px solid #00a0e2;
        border-radius: 4px;
        margin: 2px;
        padding: 0 1px;
        position: relative;
    }

    .ui-picker__time--spilt {
        width: 3px;
        text-align: center;
        overflow: hidden;
        float: left;
        line-height: 22px;

    }

    .ui-picker__time--input {
        display: inline-block;
        width: 18px;
        height: 100%;
        border: 0;
        outline: 0;
        margin: 0;
        float: left;
        text-align: center;
        line-height: 22px;
    }

    .ui-picker__time--focus {
        background: #dbe9ff;
    }

    .ui-picker__time--input:focus {
        background: #dbe9ff;
    }

    .ui-picker__time--spinner {
        height: 100%;
        width: 20px;
        position: absolute;
        right: 0;
        top: 0;
        list-style: none;
    }

    .ui-picker__time--spinner li {
        display: block;
        height: 11px;
        position: relative;
        background: #dbe9ff;
        cursor: pointer;
        border-top-right-radius: 4px;
    }

    .ui-picker__time--spinner li:after {
        content: '';
        display: block;
        width: 6px;
        height: 6px;
        border-top: 2px solid #0b93d5;
        border-right: 2px solid #0b93d5;
        transform: rotate(-45deg);
        position: absolute;
        left: 5px;
        top: 3px;
    }

    .ui-picker__time--spinner li:last-child {
        border-radius: 0;
        border-bottom-right-radius: 4px;
    }

    .ui-picker__time--spinner li:last-child:after {
        transform: rotate(135deg);
        top: 0px;
    }

    .ui-picker__time--spinner li:hover {
        background: transparent;
        box-shadow: inset 0 0 5px #0b93d5;
    }

    .ui-picker__time--spinner li:hover:after {
        border-color: blue;
    }

    .ui-picker__buttons {
        height: 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f1f1f1;
    }

    .ui-picker__button {
        flex: 1;
        text-align: center;
        cursor: pointer;
        color: #0a6ebd;
    }


</style>
<template>
    <div class="ui-date__warp" @click.stop>
        <div>
            <input type="text" class="ui-date__input" readonly="readonly" v-model="value" @click="vo.show=!vo.show">
            <span class="ui-date__icon" :class="{'ui-date__icon--active':vo.show}" @click="vo.show=!vo.show"></span>
        </div>
        <transition name="ui-date" mode="out-in" appear>
            <div class="ui-date_picker" ref="date_picker" v-show="vo.show">
                <ul class="ui-date__spinner">
                    <li @click="prevYear()">
                        <span class="ui-date__spinner--prev"></span>
                        <span class="ui-date__spinner--prev"></span>
                    </li>
                    <li @click="prevMonth()" class="ui-date__spinner--prev"></li>
                    <li class="ui-date__value" @click="changeIndex()">{{vo.ChineseMonths[vo.currMonth-1]}}月
                        {{vo.currYear}}
                    </li>
                    <li @click="nextMonth()" class="ui-date__spinner--next"></li>
                    <li @click="nextYear">
                        <span class="ui-date__spinner--next"></span>
                        <span class="ui-date__spinner--next"></span>
                    </li>
                </ul>
                <div v-show="vo.panelIndex==0">
                    <ul class="ui-date__week">
                        <li v-for="item in vo.weekDays">{{item}}</li>
                    </ul>
                    <ul class="ui-date__days">
                        <li v-for="item,index in vo.days" class="ui-date__day" @click="selectDay(item)"
                            :class="{'ui-date__day--not-curr-month':(item.year!=vo.currYear||item.month!=vo.currMonth),
                                     'ui-date__day--sunday':(index+2)%7==0,
                                     'ui-date__day--saturday':(index+1)%7==0,
                                     'ui-date__day--curr':(item.year==vo.currYear&&item.month==vo.currMonth&&item.day==vo.currDay),
                                     'ui-date__day--disabled':item.disabled}">
                            {{item.day}}
                        </li>
                    </ul>
                </div>
                <div v-show="vo.panelIndex==1" class="ui-date__months-warp">
                    <ul class="ui-date__spinner ui-date__spinner--month">
                        <li @click="prevYear()">
                            <span class="ui-date__spinner--prev"></span>
                            <span class="ui-date__spinner--prev"></span>
                        </li>
                        <li>
                            <input type="text" v-model="vo.currYear" maxlength="4">
                        </li>
                        <li @click="nextYear()">
                            <span class="ui-date__spinner--next"></span>
                            <span class="ui-date__spinner--next"></span>
                        </li>
                    </ul>
                    <ul class="ui-date__months">
                        <li v-for="(item,index) in vo.ChineseMonths" class="ui-date__month"
                            :class="{'ui-date__month-curr':(index+1)==vo.currMonth}" @click="selectMonth(item,index)">
                            {{item}}月
                        </li>
                    </ul>
                </div>
                <div v-if="type=='datetime'" class="ui-picker__time">
                    <input ref="hh" type="text" class="ui-picker__time--input" v-model.lazy="po.hh" maxlength="2"
                           @focus="timeSelectAll($event,'hh')" @keydown="filterNum($event)">
                    <span class="ui-picker__time--spilt">:</span>
                    <input ref="mm" type="text" class="ui-picker__time--input" v-model.lazy="po.mm" maxlength="2"
                           @focus="timeSelectAll($event,'mm')" @keydown="filterNum($event)">
                    <span class="ui-picker__time--spilt">:</span>
                    <input ref="ss" type="text" class="ui-picker__time--input" v-model.lazy="po.ss" maxlength="2"
                           @focus="timeSelectAll($event,'ss')" @keydown="filterNum($event)">
                    <ul class="ui-picker__time--spinner">
                        <li @click="timeUp()"></li>
                        <li @click="timeDown()"></li>
                    </ul>
                </div>
                <div class="ui-picker__buttons">
                    <span class="ui-picker__button" @click="today()">今天</span>
                    <span class="ui-picker__button" @click="sure()">确定</span>
                    <span class="ui-picker__button" @click="close()">关闭</span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    let instances = []
    document.addEventListener('click', () => {
        for (let item of instances) {
            if (item.vo.show) {
                item.$emit('hide')
                item.vo.show = false
            }
        }
    })

    function getDateTimeString(date,type,dateSpilt,timeSpilt){
        let str=`${date.getFullYear()}${dateSpilt}${String(date.getMonth()+1).padStart(2,'0')}${dateSpilt}${String(date.getDate()).padStart(2,'0')}`
        if(type=="datetime"){
            str+=` ${String(date.getHours()).padStart(2,'0')}${timeSpilt}${String(date.getMinutes()).padStart(2,'0')}${timeSpilt}${String(date.getSeconds()).padStart(2,'0')}`
        }
        return str
    }
    export default {
        data(){
            return {
                vo: {
                    show: true,
                    panelIndex: 0,
                    days: [],
                    weekDays:["一", "二", "三", "四", "五", "六", "日"],
                    ChineseMonths: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
                    currYear: 0,
                    currMonth: 0,
                    currDay: 0,
                    timeSelected: '',
                    minYear: 1970,
                },
                po: {
                    year: 0,
                    month: 0,
                    day: 0,
                    hh: 0,
                    mm: 0,
                    ss: 0,
                }
            }
        },
        props: {
            type: {
                type: String,
                default: 'datetime'
            },

            dateSpilt: {
                type: String,
                default: '-'
            },
            timeSpilt: {
                type: String,
                default: ':'
            },
            disabledDate:{
                type: Function,
                default: function () {
                    return false
                }
            },
            value: {
                type: String,
                default: function () {
                    return getDateTimeString(new Date(),this.type,this.dateSpilt,this.timeSpilt)
                }
            },
        },
        computed: {},
        methods: {
            //
            changeIndex(){
                this.vo.panelIndex = Math.abs(this.vo.panelIndex - 1)
            },
            //日期操作
            prevYear(){
                if (this.vo.currYear - 1 >= this.vo.minYear) {
                    this.vo.currYear = this.vo.currYear - 1
                    this.rendePicker(new Date(this.vo.currYear, this.vo.currMonth - 1, 1))
                }
            },
            nextYear(){
                this.vo.currYear = this.vo.currYear + 1
                this.rendePicker(new Date(this.vo.currYear, this.vo.currMonth - 1, 1))
            },
            prevMonth(){
                if (this.vo.currMonth == 1) {
                    if (this.vo.currYear - 1 >= this.vo.minYear) {
                        this.vo.currYear = this.vo.currYear - 1
                        this.vo.currMonth = 12
                        this.rendePicker(new Date(this.vo.currYear, this.vo.currMonth - 1, 1))
                    }
                } else {
                    this.vo.currMonth = this.vo.currMonth - 1
                    this.rendePicker(new Date(this.vo.currYear, this.vo.currMonth - 1, 1))
                }

            },
            nextMonth(){
                if (this.vo.currMonth == 12) {
                    this.vo.currMonth = 1
                    this.vo.currYear = this.vo.currYear + 1
                } else {
                    this.vo.currMonth = this.vo.currMonth + 1
                }
                this.rendePicker(new Date(this.vo.currYear, this.vo.currMonth - 1, 1))
            },
            selectDay(item){
                if(item.disabled){
                    return
                }
                let render = false
                if (item.year != this.vo.currYear) {
                    this.vo.currYear = item.year
                    render = true
                }
                if (item.month != this.vo.currMonth) {
                    this.vo.currMonth = item.month
                    render = true
                }
                this.vo.currDay = item.day
                if (render) {
                    this.rendePicker(new Date(item.year, item.month - 1, 1))
                }
            },
            selectMonth(item, index){
                if ((index + 1) != this.vo.currMonth) {
                    this.vo.currMonth = (index + 1)
                    this.rendePicker(new Date(this.vo.currYear, index, 1))
                    this.vo.panelIndex=0
                }
            },
            //------------日期------------
            rendePicker(date){
                let days = []
                let currYear = date.getFullYear()//当前日期年份
                let currMonth = date.getMonth() + 1//当前日期月份
                let firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
                let week = firstDay.getDay()//当前月份1号是周几

                if (week == 0) {
                    week == 7;
                }
                week -= 1;
                let tempMonth = 0
                let tempYear = currYear

                if (week != 0) {
                    //上个月
                    tempMonth = currMonth - 1  //上一个月份
                    if (tempMonth == 0) {
                        tempMonth = 12
                        tempYear = currYear - 1
                    }
                    let prevMonthDays = this.getMonthDays(tempMonth, tempYear)
                    for (let i = 0; i < week; i++) {
                        days.push({"year": tempYear, "month": tempMonth, "day": prevMonthDays - i})
                    }
                    days.reverse()
                }

                //当前月
                let currMonthDays = this.getMonthDays(currMonth, currYear)
                for (let i = 1; i <= currMonthDays; i++) {
                    days.push({"year": currYear, "month": currMonth, "day": i})
                }


                //下个月
                tempMonth = currMonth + 1
                if (tempMonth == 13) {
                    tempMonth = 1
                    tempYear = currYear + 1
                }
                let len = 42 - days.length
                for (let i = 1; i <= len; i++) {
                    days.push({"year": tempYear, "month": tempMonth, "day": i})
                }
                for(let item of days){
                    item.disabled=this.disabledDate(new Date(item.year,item.month-1,item.day))
                }
                this.vo.days = days
            },
            setDateTime(date){

                this.vo.currYear = date.getFullYear()
                this.vo.currMonth = date.getMonth() + 1
                this.vo.currDay = date.getDate()

                this.po.year = date.getFullYear()
                this.po.month = date.getMonth() + 1
                this.po.day = date.getDate()

                this.po.hh = date.getHours()
                this.po.mm = date.getMinutes()
                this.po.ss = date.getSeconds()
            },
            getMonthDays(month, year) {//获取天数
                let dayLength = 0;
                switch (month) {
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
                        dayLength = 28
                        if (year % 100 == 0) {
                            if (year % 400 == 0) {
                                dayLength = 29
                            }
                        } else if (year % 4 == 0) {
                            dayLength = 29
                        }
                        break
                    default:
                        dayLength = 30
                        break
                }
                return dayLength
            },
            //------------时间------------
            timeSelectAll(e, type){
                e.target.select()
                this.vo.timeSelected = type
                this.$refs['hh'].classList.remove("ui-picker__time--focus")
                this.$refs['mm'].classList.remove("ui-picker__time--focus")
                this.$refs['ss'].classList.remove("ui-picker__time--focus")
            },
            filterNum(e){
                //[48-57] 0-9
                let keys = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 127, 13, 37, 38, 39, 40, 9]

                if (keys.indexOf(e.keyCode) == -1) {
                    e.preventDefault()
                    e.stopPropagation()
                    console.info(e.keyCode)
                    return false
                }
            },
            timeUp(){
                let max = 59
                if (this.vo.timeSelected == '') {
                    this.vo.timeSelected = 'hh'
                }
                this.$refs[this.vo.timeSelected].classList.remove("ui-picker__time--focus")
                if (this.vo.timeSelected == 'hh') {
                    max = 23
                }
                let time = Number.parseInt(this.po[this.vo.timeSelected])
                if (Number.isNaN(time)) {
                    time = 0
                }
                if (time + 1 <= max) {
                    this.po[this.vo.timeSelected] = time + 1
                } else {
                    this.po[this.vo.timeSelected] = '00'
                }
                setTimeout(()=> {
                    this.$refs[this.vo.timeSelected].classList.add("ui-picker__time--focus")
                }, 100)
            },
            timeDown(){
                let max = 59
                if (this.vo.timeSelected == '') {
                    this.vo.timeSelected = 'hh'
                }
                this.$refs[this.vo.timeSelected].classList.remove("ui-picker__time--focus")
                if (this.vo.timeSelected == 'hh') {
                    max = 23
                }
                let time = Number.parseInt(this.po[this.vo.timeSelected])
                if (Number.isNaN(time)) {
                    time = 0
                }
                if (time - 1 >= 0) {
                    this.po[this.vo.timeSelected] = time - 1
                } else {
                    this.po[this.vo.timeSelected] = max
                }
                this.$refs[this.vo.timeSelected].classList.remove("ui-picker__time--focus")
                setTimeout(()=> {
                    this.$refs[this.vo.timeSelected].classList.add("ui-picker__time--focus")
                }, 100)

            },
            //------------底部按钮------------
            today(){
                let date = new Date()
                this.setDateTime(date)
                this.rendePicker(date)
                this.sure()
            },
            sure(){
                this.po.year = this.vo.currYear
                this.po.month = this.vo.currMonth
                this.po.day = this.vo.currDay

                this.$nextTick(()=>{
                    let val=`${this.po.year}${this.dateSpilt}${String(this.po.month).padStart(2, '0')}${this.dateSpilt}${String(this.po.day).padStart(2, '0')}`
                    if (this.type == "datetime") {
                        val +=` ${this.po.hh}${this.timeSpilt}${this.po.mm}${this.timeSpilt}${this.po.ss}`
                    }
                    this.$emit("input", val)
                    this.close()
                })
                console.info(this)
            },
            close(){
                this.vo.show = false
            }
        },
        mounted(){
            instances.push(this)
            let date
            if(this.value){
                date=new Date(this.value.replace(this.dateSplit,'/').replace(this.timeSplit,':'))
            }else{
                date= new Date()
            }
            this.setDateTime(date)
            this.rendePicker(date)
        },
        watch: {
            'po.hh': function (val) {
                let change = false
                val = Number.parseInt(val)
                if (Number.isNaN(val)) {
                    val = '00'
                    change = true
                } else if (val < 0) {
                    val = '00'
                    change = true
                }
                if (val > 23) {
                    val = '23'
                    change = true
                }
                val = String(val)
                if (val.length != 2) {
                    val = val.padStart(2, '0')
                    change = true
                }
                if (change) {
                    this.po.hh = val
                }
            },
            'po.mm': function (val) {
                let change = false
                val = Number.parseInt(val)
                if (Number.isNaN(val)) {
                    val = '00'
                    change = true
                } else if (val < 0) {
                    val = '00'
                    change = true
                }
                if (val > 59) {
                    val = '59'
                    change = true
                }
                val = String(val)
                if (val.length != 2) {
                    val = val.padStart(2, '0')
                    change = true
                }
                if (change) {
                    this.po.mm = val
                }
            },
            'po.ss': function (val) {
                let change = false
                val = Number.parseInt(val)
                if (Number.isNaN(val)) {
                    val = '00'
                    change = true
                } else if (val < 0) {
                    val = '00'
                    change = true
                }
                if (val > 59) {
                    val = '59'
                    change = true
                }
                val = String(val)
                if (val.length != 2) {
                    val = val.padStart(2, '0')
                    change = true
                }
                if (change) {
                    this.po.ss = val
                }
            }
        }
    }
</script>