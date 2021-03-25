class Jq {
    constructor(arg) {
         //  jquery 写法 $(function () {})
        if(typeof arg === 'function') {
            window.addEventListener('DOMContentLoaded', arg)
        }else if(typeof arg === 'string'){
            // 传入选择器 id class
            const eles = document.querySelectorAll(arg)
            for (let i = 0; i < eles.length; i++) {
                this[i] = eles[i]
            }
            this.length = eles.length
        }else {
            
            // 传入原生dom元素
            if (typeof arg.length == null) {
                this[0] = arg
                this.length = 1
            }else {
                for (let i = 0; i < arg.length; i++) {
                    this[i] = arg[i]
                }
                this.length = arg.length
            }
        }
        

       
    }
    click(fn) {
        for(let i = 0; i< this.length;i++) {
            this[i].addEventListener('click',fn)
        }
       
    }
}

export default function $(arg) {
    return new Jq(arg)
}