'use strict'

const viewsArr = [
    {
        textView: {
            type: 'text',
            id: 'textView',
            name: 'textView',
            value: 'Maxim'
        }
    },
    {
        radioView: {
            type: 'radio',
            id: 'radioView',
            name: 'radioView',
            value: {
                male: 'male',
                female: 'female'
            }
        }
    },
    {
        imageView: {
            type: 'image',
            id: 'imageView',
            name: 'imageView',
            src: 'https://hypeava.ru/uploads/posts/2018-04/1523898769_1.gif'
        }
    }
]

class ImageView{

    constructor(parent, view) {
        for(let key in view){
            this.id  = key;
            this.name = view[key].name;
            this.src = view[key].src;
        }
        const div = document.createElement('div');
        parent.append(div);

        div.className = 'imageViewWrapper'

        this.node = div;
        this.image = this.createInput('image', this.id, this.name, this.src);
        div.append(this.image);

        const divBtn = document.createElement('divBtn');
        div.prepend(divBtn);

        divBtn.className = 'imageBtns';

        const inputUploadImg = this.createInput('file', 'file', 'file');

        divBtn.append(inputUploadImg);

        inputUploadImg.onchange = () => {
            let preview = this.image;
            let file = inputUploadImg.files[0];
            let reader = new FileReader(file);

            reader.onloadend = () => {
                this.src = reader.result;
                preview.src = reader.result;
            }
            if (file) {
                reader.readAsDataURL(file);
            } else {
                preview.src = this.src;
            }
        }
    }

    getImage(){
        return this.image;
    }

    createBtn(){
        const newBtn = document.createElement('a');
        newBtn.setAttribute('href', 'https://bipbap.ru/wp-content/uploads/2018/06/3c980dd2e9c909ada7377cc89885231b.jpg')
        newBtn.setAttribute('download', '')
        newBtn.textContent = 'download img';
        newBtn.className = 'downloadImg';

        return newBtn
    }

    getResult(){
        return this.image;
    }

    destroy(){
        this.node.remove();
    }

    createInput(type, id, name, src){
        const input = document.createElement('input');
        input.setAttribute('type', type);
        input.setAttribute('id', id);
        input.setAttribute('name', name);
        input.setAttribute('src',src);
        return input;
    }
}

class RadioView{
    /**
     *
     * @param {HTMLElement} parent
     * @param {Object} view
     */
    constructor(parent, view) {
        for(let key in view){
            this.id  = key;
            this.name = view[key].name;
            this.value = view[key].value;
        }
        const div = document.createElement('div');
        parent.append(div);

        div.className = 'radioViewWrapper';

        this.node = div;

        const p = this.createP('Выберите ваш пол: ');
        div.append(p);

        const radioWrapper = document.createElement('div');
        radioWrapper.className = 'radioWrapper';
        div.append(radioWrapper);
        this.radioBtn = [];
        this.lableRadio = []
        for(let key in this.value){
            this.radioBtn.push(this.createRadioBtn(this.id, this.value[key]));

            this.lableRadio.push(this.createLabel(this.value[key], this.value[key]));
        }

        for(let i = 0; i < this.radioBtn.length; i++){
            radioWrapper.append(this.radioBtn[i])
            radioWrapper.append(this.lableRadio[i]);
        }
    }
    destroy(){
        this.node.remove();
    }

    getResult(){
        for(let i = 0; i < 2; i++){
            if(this.radioBtn[i].checked == true)
                return this.createP(this.radioBtn[i].value);
        }
        return this.createP('animal');
    }

    /**
     *
     * @param {String} type
     * @param {String} id
     * @param {String} name
     * @param {String} value
     * @returns {HTMLInputElement}
     */
    createInput(type, id, name, value){
        const input = document.createElement('input');
        input.setAttribute('type', type);
        input.setAttribute('id', id);
        input.setAttribute('name', name);
        input.setAttribute('value',value);
        return input;
    }

    /**
     *
     * @param {String} text
     * @returns {HTMLParagraphElement}
     */
    createP(text){
        const p = document.createElement('p');
        p.textContent = text;
        return p;
    }

    /**
     *
     * @param {String} name
     * @param {String} text
     * @returns {HTMLLabelElement}
     */
    createLabel(name, text){
        const label = document.createElement('label');
        label.setAttribute('for', name);
        label.textContent = text;
        return label;
    }

    /**
     *
     * @param {String} name
     * @param {String} value
     * @returns {HTMLInputElement}
     */
    createRadioBtn(name, value){
        const radioBtn = document.createElement('input');
        radioBtn.setAttribute('type', 'radio');
        radioBtn.setAttribute('name', name);
        radioBtn.setAttribute('id', value);
        radioBtn.setAttribute('value', value);
        return radioBtn
    }
}

class TextView{
    /**
     *
     * @param {HTMLElement} parent
     * @param {Object} view
     */
    constructor(parent, view) {
        for(let key in view){
            this.id  = key;
            this.name = view[key].name;
            this.value = view[key].value;
        }

        const div = document.createElement('div');
        parent.append(div);
        this.node = div;

        div.className = 'textViewWrapper';
        this.labelForInput = this.createLabel(this.name, 'Введите имя');
        this.textInput = this.createInput('text', this.id, this.name, this.value);
        div.append(this.labelForInput);
        div.append(this.textInput);
    }
    getResult(){
        return this.createP(this.textInput.value)
    }

    /**
     *
     * @param {String} name
     * @param {String} text
     * @returns {HTMLLabelElement}
     */
    createLabel(name, text){
        const label = document.createElement('label');
        label.setAttribute('for', name);
        label.textContent = text;
        return label;
    }
    createP(text){
        const p = document.createElement('p');
        p.textContent = text;
        return p;
    }

    /**
     *
     * @param {String} type
     * @param {String} id
     * @param {String} name
     * @param {String} value
     * @returns {HTMLInputElement}
     */
    createInput(type, id, name, value){
        const input = document.createElement('input');
        input.setAttribute('type', type);
        input.setAttribute('id', id);
        input.setAttribute('name', name);
        input.setAttribute('value',value);
        return input;
    }
    destroy(){
        this.node.remove();
    }

}

class NextViewBtn{
    onClose;

    /**
     *
     * @param {HTMLElement} parent
     * @param {Function} destroyView
     * @param {Function} valueView
     */
    constructor(parent, destroyView, valueView) {
        this.nextViewBtn = this.createInput();
        parent.append(this.nextViewBtn);
        this.node = this.nextViewBtn;
        this.nextViewBtn.onclick = () => {
            // func();
            this.onClose?.(valueView());
            destroyView()
            this.destroyBtn();
        }
    }
    destroyBtn(){
        this.nextViewBtn.remove();
    }

    /**
     *
     * @returns {HTMLInputElement}
     */
    createInput(){
        const button = document.createElement('input');
        button.setAttribute('type','button');
        button.setAttribute('id','btnId');
        button.setAttribute('value', 'Next');
        return button;
    }

    /**
     *
     * @returns {HTMLInputElement}
     */
    getElement(){
        return this.nextViewBtn;
    }
}

/**
 *
 * @param {HTMLBodyElement} parent
 * @param {Array} views
 */

function showAllData (result, parent){
    const div = document.createElement('div');
    div.className = 'allData';

    parent.append(div);

    const h1 = document.createElement('h1');
    h1.textContent = 'Your profile';
    div.append(h1)


    result.map(el => {
        div.append(el)

    })
}

function startCreateProfile(parent, views){
    const div = document.createElement('div');
    parent.prepend(div);
    div.className = 'container';
    const viewArr = [];

    const forEach = (showAllData, res = []) => {
        let view;
        for(let key in views[res.length])
            switch (views[res.length][key]['type']){
                case 'text':
                    view = new TextView(div, views[res.length]);
                    break;
                case 'radio':
                    view = new RadioView(div, views[res.length]);
                    break;
                case 'image':
                    view = new ImageView(div, views[res.length]);
                    break;
                default:
                    console.log('wtfMan?');
            }
        const nextViewBtn = new NextViewBtn(div, view.destroy.bind(view), view.getResult.bind(view));
        nextViewBtn.onClose = (result) => {
            const newRes = [...res, result];
            if(res.length == views.length - 1){
                showAllData(newRes, div);
            }
            else {
                forEach(showAllData, newRes);
            }
        };
    };

    return new Promise((resolve)=>{
        resolve(forEach(showAllData));
    });
}
startCreateProfile(document.body, viewsArr).then(results => {

})