<template lang="html">
    <cells>
        <cell>
            <label slot="icon">时间：</label>
            <datetimePicker slot="content" v-model="po.date" ></datetimePicker>
        </cell>
        <cell>
            <label slot="icon">时间日期：</label>
            <datetimePicker slot="content" v-model="po.datetime" type="hh:mm:ss"></datetimePicker>
        </cell>
        <cell>
            <label slot="icon">地区：</label>
            <picker slot="content"  :header="vo.headArr" :selectIndexs="vo.selectIndexs" :changeEventAll="false" :data="vo.area" textField="name" @change="change" @done="selectDone">
                <input type="text">
            </picker>
        </cell>
    </cells>
</template>

<script>
    export default {
        data() {
            return {
                po: {
                    date: "2016-02-28 12:23:32",
                    area: {
                    },
                    datetime:'12:12:11'
                },
                vo: {
                    headArr:["省份","城市","地区","乡镇","村庄"],
                    area: {
                        'provice': [],
                        'city': [],
                        'county': [],
                        'town': [],
                        'village': []
                    },
                    selectIndexs:[]
                }
            }
        },
        methods: {
            selectDone(value,items){
                this.po.area=items
            },
            change(key, data){
                switch (key) {
                    case "provice":
                        this.getCity(data.id)
                        break;
                    case "city":
                        this.getCounty(data.id)
                        break;
                    case "county":
                        this.getTown(data.id)
                        break;
                    case "town":
                        this.getVillage(data.id)
                        break;
                }
                this.$set(this.po.area,key,data)

            },
            getVillage(id){
                this.getData('village', id)
            },
            getTown(id){
                this.getData('town', id).then(()=> {
                   if(this.vo.area['town'].length){
                       this.getData('village', this.vo.area['town'][0]['id'])
                   }else{
                       this.vo.area['village']=[]
                   }
                })
            },
            getCounty(id){
                this.getData('county', id).then(()=> {
                    if (this.vo.area['county'].length) {
                        return this.getData('town', this.vo.area['county'][0]['id'])
                    } else {
                        this.vo.area.town = []
                    }
                }).then(()=> {
                    if (this.vo.area['town'].length) {
                        this.getData('village', this.vo.area['town'][0]['id'])
                    } else {
                        this.vo.area.village = []
                    }
                })
            },
            getCity(id){
                this.getData('city', id).then(()=> {
                    if(this.vo.area['city'].length){
                        return this.getData('county', this.vo.area['city'][0]['id'])
                    }else{
                        this.vo.area.county = []
                    }
                }).then(()=> {
                    if(this.vo.area['county'].length){
                        return this.getData('town', this.vo.area['county'][0]['id'])
                    }else{
                        this.vo.area.town = []
                    }
                }).then((data)=> {
                    if (this.vo.area['town'].length) {
                        this.getData('village', this.vo.area['town'][0]['id'])
                    }else{
                        this.vo.area['village']=[]
                    }
                })
            },
            getAllData(){
                this.getData('provice').then(()=> {
                    if (this.vo.area['provice'].length > 0) {
                        return this.getData('city', this.vo.area['provice'][0]['id'])
                    } else {
                        this.vo.area.city = []
                        this.vo.area.county = []
                        this.vo.area.town = []
                        this.vo.area.village = []
                    }
                }).then(()=> {
                    if (this.vo.area['city'].length > 0) {
                        return this.getData('county', this.vo.area['city'][0]['id'])
                    } else {
                        this.vo.area.county = []
                        this.vo.area.town = []
                        this.vo.area.village = []
                    }
                }).then(()=> {
                    if (this.vo.area['county'].length > 0) {
                        return this.getData('town', this.vo.area['county'][0]['id'])
                    } else {
                        this.vo.area.town = []
                        this.vo.area.village = []
                    }
                }).then(()=> {
                    if (this.vo.area['town'].length > 0) {
                        this.getData('village', this.vo.area['town'][0]['id']).then(()=>{
                            this.vo.selectIndexs=[2,1,4,5,6]
                        })
                    } else {
                        this.vo.area.village = []
                        this.vo.selectIndexs=[2,1,4,5,6]
                    }
                })

            },
            getData(type, id){
                return new Promise((resolve, reject)=> {
                    this.$http.get('/mysql/' + type, {params: {id: id}}).then(res=> {
                        this.vo.area[type] = res.data
                        resolve(res.data)
                    }).catch(err=> {
                        reject(err)
                    })
                })
            },
        },
        mounted: function () {
            setTimeout(()=>{
                this.po.date="2011-01-22 11:33:22"
                this.po.datetime="23:23:32"
            },5000)
        }
    }
</script>
