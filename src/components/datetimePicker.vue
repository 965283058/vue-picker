<style scoped></style>
<template>
    <picker v-if="vo.render" ref="basePK" :header="vo.headArr" :selectIndexs="vo.selectIndexs" :changeEventAll="false"
            :changeAfterToTop="false"
            :data="vo.data"
            textField="name" @change="change" @done="selectDone">
        <input type="text" readonly="readonly" v-model="value">
    </picker>
</template>

<script>
    import picker from './picker'
    export default {
        data(){
            return {
                vo: {
                    render: false,
                    headArr: [],
                    area: {
                        'provice': [],
                        'city': [],
                        'county': [],
                        'town': [],
                        'village': []
                    },
                    selectIndexs: [],
                    data: {}
                },
                po: {
                    year: null,
                    month: null,
                    day: null,
                    hours: null,
                    minutes: null,
                    seconds: null
                }
            }
        },
        props: {
            "value": {
                type: String,
                default: function () {
                    return this.dateToString()
                }
            },
            type: {
                type: String,
                default: 'yyyy-MM-dd hh:mm:ss',
                validator: function (value) {
                    return true
                }
            },
            max: {
                type: String,
                default: '2099-12-31'
            }
        },
        computed: {},
        methods: {
            change(key, value){
                this.po[key] = value + ''
                this.computeDay(key)
            },
            computeDay(key){
                if (this.vo.data.day && this.vo.data.day.length > 0) {//如果显示天数
                    if (key == 'month' || (key == 'year' && this.po.month == "02")) {
                        this.vo.data.day = this.getDayArray(Number.parseInt(this.po.year), this.po.month)
                        var lastDay = this.vo.data.day[this.vo.data.day.length - 1]
                        if (this.po.day && lastDay < parseInt(this.po.day)) {
                            this.$refs["basePK"].scrollToItem("day", parseInt(lastDay) - 1)
                            this.po.day = lastDay
                        }
                    }
                }
            },
            selectDone(value, map){
                let val = this.type.replace("yyyy", map.year).replace("MM", map.month).replace("dd", map.day).replace("hh", map.hours).replace("mm", map.minutes).replace("ss", map.seconds)
                this.$emit("input", val)
            },
            //"年", "月", "日", "时", "分", "秒"
            initPanelDate() { //初始化数据
                if (this.type.indexOf("yyyy") > -1) {
                    let year = []
                    for (let i = 1970; i <= new Date().getFullYear(); i++) {
                        year.push(`${i}`)
                    }
                    this.$set(this.vo.data, "year", year)
                    this.vo.headArr.push("年")
                }

                if (this.type.indexOf("MM") > -1) {
                    let month = []
                    for (let i = 1; i <= 12; i++) {
                        month.push(this.padLeft(i))
                    }
                    this.$set(this.vo.data, "month", month)
                    this.vo.headArr.push("月")
                }

                if (this.vo.data.hasOwnProperty("year") && this.vo.data.hasOwnProperty("month") && this.type.indexOf("dd") > -1) {
                    let day = []
                    for (let i = 1; i <= 30; i++) {
                        day.push(this.padLeft(i))
                    }
                    this.$set(this.vo.data, "day", day)
                    this.vo.headArr.push("日")
                }


                if (this.type.indexOf("hh") > -1) {
                    let hours = []
                    for (let i = 0; i <= 23; i++) {
                        hours.push(this.padLeft(i))
                    }
                    this.$set(this.vo.data, "hours", hours)
                    this.vo.headArr.push("时")
                }


                if (this.type.indexOf("mm") > -1) {
                    let minutes = []
                    for (let i = 0; i <= 59; i++) {
                        minutes.push(this.padLeft(i))
                    }
                    this.$set(this.vo.data, "minutes", minutes)
                    this.vo.headArr.push("分")
                }

                if (this.type.indexOf("ss") > -1) {
                    let seconds = []
                    for (let i = 0; i <= 59; i++) {
                        seconds.push(this.padLeft(i))
                    }
                    this.$set(this.vo.data, "seconds", seconds)
                    this.vo.headArr.push("秒")
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
            getDayArray(year, month) {//获取天数
                let dayLength = 0;
                switch (parseInt(month, 10)) {
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
                        if ((year % 100 == 0 && year % 400 == 0 ) || (year % 100 != 0 && year % 4 == 0)) {
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
                return tempArr;
            },
            dateToString(data = new Date()){
                var year = date.getFullYear(),
                        month = date.getMonth() + 1,
                        day = date.getDate(),
                        hh = date.getHours(),
                        mm = date.getMinutes(),
                        ss = date.getSeconds();

                return year + "-" + padLeft(month) + "-" + padLeft(day) + " " + padLeft(hh) + ":" + padLeft(mm) + ":" + padLeft(ss);


                function padLeft(number) {
                    if (parseInt(number) < 10) {
                        return '0' + number;
                    }
                    return number;
                }
            },
            selectDate(value){
                if (value) {
                    this.vo.selectIndexs = value.match(/[0-9]{1,4}/g)
                }
            }
        },
        mounted(){
            this.initPanelDate();
            this.selectDate(this.value);
            this.vo.render = true
        },
        components: {
            picker
        },
        watch: {
            'value': function (val) {
                this.selectDate(val)
            }
        }
    }
</script>