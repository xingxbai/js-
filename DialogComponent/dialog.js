export default class Dialog extends EventTarget{
    constructor(options) {
        super()
        const defaultOptions = {
            width: '30%',
            height: '250px',
            content: '我是内容',
            title: '我是标题',
            dragable: true,
            maskable: true,
            isCancel: false,
            success(){},
            cancel(){}
        }
        this.opts = Object.assign(defaultOptions, options)
        this.init()
    }
    init() {
        this.createElement()

        this.addEventListener('success', this.opts.success) //自定义事件
        this.addEvent()



    }
    createElement() {
        const divEles = document.createElement('div')
        divEles.innerHTML = `<div class="k-dialog">
            <div class="k-head">
                <span>${this.opts.title}</span>
            </div>
            <div class="k-body">
                <span>${this.opts.content}</span>
            </div>
            <div class="k-footer">
                <span class="k-cancel">取消</span>
                <span class="k-primary">确定</span>
            </div>
        </div>`
        divEles.style.display = 'none'
        document.body.appendChild(divEles)
        this.divEles = divEles
    }

    addEvent() {
        const kDialog = this.divEles.querySelector('.k-dialog')
        kDialog.addEventListener('click', (e) => {
            let className = e.target.className
            switch (className) {
                case 'k-close':
                    this.close()
                    break;
                case 'k-cancel':
                    this.close()
                    this.opts.cancel()
                    break;
                case 'k-primary':
                    this.sure()
                    this.close()
                   // this.opts.success()
                    break;
                default:
                    console.log('未命中')
            }
        })
    }

    sure(value) {
        const success = new CustomEvent('success',{detail:value}) // 自定义事件，继承EventTarget
        this.dispatchEvent(success) //自定义事件
    }
    open() {
        this.divEles.style.display = 'block'
    }
    close() {
        this.divEles.style.display = 'none'
    }
}






export class InputDialog extends Dialog {
    constructor(options) {
        super(options)
        this.createInput()
    }
    createInput() {
        const myInput = document.createElement('input')
        myInput.classList.add('k-input')
        this.myInput = myInput
         this.divEles.querySelector('.k-body').appendChild(myInput)
    }
    sure() {
        super.sure(this.myInput.value)
    }
}
