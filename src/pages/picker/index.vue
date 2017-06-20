<template lang="html">
    <cells>
        <cell>
            <label slot="content">{{po.date}}</label>
        </cell>
        <cell>
            <label slot="icon">时间：</label>
            <datePicker slot="content" v-model="po.date"></datePicker>
        </cell>

        <cell>
            <label slot="content">{{po.area}}</label>
        </cell>
        <cell>
            <label slot="icon">地区：</label>
            <picker slot="content" :data="vo.area" @change="change"></picker>
        </cell>
    </cells>
</template>

<script>
    export default {
        data() {
            return {
                po: {
                    date: "2016-02-28 12:23:32",
                    area: ''
                },
                vo: {
                    area: {
                        'provice': [],
                        'city': [],
                        'county': [],
                    }
                }
            }
        },
        methods: {
            change(key, data){
                if(key=='provice'){
                    this.getData('city').then(()=> {
                        this.getData('county', this.vo.area['city'][0]['id']).then(()=> {
                            this.getData('county', this.vo.area['city'][0]['id'])
                        })
                    })
                }
                this.po.area = data
            },
            getData(type, id){
                return this.$http.get('/mysql/' + type, {params: {id: id}}).then(res=> {
                    this.vo.area[type] = res.data
                })
            }
        },
        mounted: function () {
            this.getData('provice').then(()=> {
                this.getData('city', this.vo.area['provice'][0]['id']).then(()=> {
                    this.getData('county', this.vo.area['city'][0]['id'])
                })
            })


        }
    }
</script>
