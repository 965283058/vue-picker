class Move {
    constructor() {
        this.touch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch
        this.$el = null
        //事件
        this.events = {
            el: null,     //绑定元素
            moveFn: null, //移动执行函数
            beginPos: null,//开始移动的位置
            endPos: null,
            movePos: null,//移动的位置
            isActice: true,
            handleEvent: function (event) {
                var self = this;     //this指events对象
                if (event.type == 'touchstart') {
                    self.start(event);
                } else if (event.type == 'touchmove') {
                    self.move(event);
                } else if (event.type == 'touchend') {
                    self.end(event);
                }
            },
            //滑动开始
            start (event) {
                var touch = event.targetTouches[0];     //touches数组对象获得屏幕上所有的touch，取第一个touch
                this.movePos = {x: touch.pageX, y: touch.pageY, time: +new Date};    //取第一个touch的坐标值
                this.beginPos = this.movePos
                this.el.addEventListener('touchmove', this, false);
                this.el.addEventListener('touchend', this, false);
            },
            //移动
            move (event) {
                if (this.isActice) {
                    if (event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
                    var touch = event.targetTouches[0];
                    var date = +new Date()
                    var endPos = {x: touch.pageX, y: touch.pageY}
                    this.moveFn({
                        pos: {x: touch.pageX - this.movePos.x, y: touch.pageY - this.movePos.y},
                        beginPos: this.beginPos,
                        endPos: endPos,
                        end: false,
                        time: date - this.movePos.time
                    })
                    this.movePos = {x: touch.pageX, y: touch.pageY, time: date}
                    this.endPos = endPos
                    this.isActice=false
                    setTimeout(()=> {
                        this.isActice=true
                    }, 50)
                }
            },
            //滑动释放,
            end (event) {
                this.moveFn({
                    pos: {x: 0, y: 0},
                    beginPos: this.beginPos,
                    endPos: this.endPos,
                    end: true,
                    time: +new Date() - this.beginPos.time,
                })
                //解绑事件
                this.el.removeEventListener('touchmove', this, false);
                this.el.removeEventListener('touchend', this, false);
            }
        }
    }


    //初始化
    init(el, fn) {
        this.$el = el;
        this.events.el = el;
        this.events.moveFn = fn
        if (!!this.touch) this.$el.addEventListener('touchstart', this.events, false);    //addEventListener第二个参数可以传一个对象，会调用该对象的handleEvent属性
    }

    destroy() {
        this.el.removeEventListener('touchstart', this.events, false);
    }
}

export default {
    inserted: function (el, binding, vnode) {
        let fn = binding.expression.replace(/(\s+)|(\(.*\))/g, '')
        var move = new Move();
        move.init(el, vnode.context[fn])
        el.move = move
    },
    unbind: function (el, binding, vnode) {
        this.el.move.destroy()
        this.el.move = null
    }
}
