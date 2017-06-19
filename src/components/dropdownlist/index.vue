<style scoped>
    .dropdown-list {
        background-color: #fff;
    }
    .dropdown-list--active{
        border-bottom: 1px solid #d1d1d1; /*no*/
    }
    .dropdown-list__head {
        display: flex;
        height: 90px;
        margin-left: 30px;
        align-items: center;
        border-bottom: 1px solid #d1d1d1; /*no*/
    }
    .dropdown-list__point {
        width: 10px;
        height: 10px;
        margin-right: 16px;
        background-color: #4d4d4d;
        transform: rotate(45deg);
    }
    .dropdown-list__title {
        flex: 1;
        font-size: 30px;
        color: #000;
    }
    .dropdown-list__arrow {
        width: 12px;
        height: 12px;
        margin: 0 30px 0 20px;
        border: 2px solid #C8C8CD; /*no*/
        border-top-width: 0;
        border-right-width: 0;
        transform: rotate(-45deg);
    }



    .dropdown-list--active .dropdown-list__arrow {
        transform: rotate(135deg);
    }
    .dropdown-list__content {
        padding: 36px 30px 36px 60px;
        color: #4D4D4D;
        font-size: 24px;
        line-height: 40px;
    }
</style>

<template>
    <div>
        <div class="dropdown-list" v-for="(item, index) of newOptions" :class="{ 'dropdown-list--active': item.isShow }" >
            <div class="dropdown-list__head"  @touchstart.stop="toggle(index)">

                <span class="dropdown-list__title text-overflow">{{ item.title }}</span>
                <span class="dropdown-list__arrow"></span>
            </div>
            <div class="dropdown-list__content" v-show="item.isShow">
                <p v-for="content of item.content">{{ content }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            options: {
                type: Array,
                required: true
            }
        },
        data(){
            return {
                oldIndex: -1,
                newOptions: null
            }
        },
        methods: {
            toggle(index){
                if(this.oldIndex !== -1 && index !== this.oldIndex){
                    this.newOptions[this.oldIndex].isShow = false
                }

                this.newOptions[this.oldIndex = index].isShow = !(this.newOptions[index].isShow)
            }
        },
        mounted(){
            this.newOptions = this.options.map((item) => Object.assign({}, { isShow: false }, item))
        }
    }
</script>
