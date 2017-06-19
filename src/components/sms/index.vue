<style scoped>
    .sms {
        width: 230px;
        height: 80px;
        color: #9ACD2F;
        font-size: 30px;
        line-height: 80px;
        text-align: center;
        border-left: 1px solid #DEDEDE; /*no*/
    }
</style>

<template>
    <div class="sms" @click="sendCode">
        <p class="sms__text--init" v-if="!sending && !again">获取验证码</p>
        <p class="sms__text--time" v-if="sending">{{ time - count }}s</p>
        <p class="sms__text--again" v-if="!sending && again">重新获取</p>
    </div>
</template>

<script>
    export default {
        props: {
            time: {
                type: [String, Number],
                default: 60
            },
            before: {
                type: Function,
                required: true
            },
            auto: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                count: 0,
                again: false,
                sending: false
            }
        },
        mounted(){
            if(this.auto) {
                setTimeout(this.sendCode, 300)
            }
        },
        methods: {
            sendCode() {
                if(!this.sending && this.before()) {
                    this.sending = true
                    this.cycle(this.done)
                }
            },
            cycle(done) {
                setTimeout(() => {
                    if(this.count === (Number(this.time) - 1)) {
                        done()
                    } else {
                        this.count += 1
                        this.cycle(done)
                    }
                }, 1000)
            },
            done() {
                this.count = 0
                this.again = true
                this.sending = false
            }
        }
    }
</script>
