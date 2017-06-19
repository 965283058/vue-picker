<template lang="html">
    <cells>
        <cell>
            <label slot="content">{{po.date}}</label>
        </cell>
        <cell>
            <label slot="icon">时间：</label>
            <picker slot="content" v-model="po.date"></picker>
        </cell>
    </cells>
</template>

<script>
    export default {
        data() {
            return {
                po: {
                    date:"2016-02-28 12:23:32"
                }
            }
        }
    }
</script>
