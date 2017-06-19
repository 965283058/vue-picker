<style scoped>
    .button {
        height: 80px;
        margin: 0 40px;
        color: #fff;
        font-size: 40px;
        border-radius: 14px;
        overflow: hidden;
    }
    .button--small {
        height: 60px;
        font-size: 30px;
    }
    .button--disable {
        background-image: none;
        background-color: #DEDEDE;
    }
    button {
        width: 100%;
        height: 100%;
        padding: 0;
        border: 0 none;
        -webkit-appearance: none;
        background-color: #009EE2;
    }
</style>

<template>
    <div class="button" :class="[size ? 'button--' + size : '']">
        <button :type="type" @click="handle" :disabled="disabled" :class="{ 'button--disable': disabled }">
            <slot></slot>
        </button>
    </div>
</template>

<script>
    export default {
        props: {
            size: String,
            disabled: Boolean,
            type: {
                type: String,
                default: 'button'
            }
        },
        methods: {
            handle(e) {
                if(!this.disabled) {
                    this.$emit('click', e)
                }
            }
        }
    }
</script>
