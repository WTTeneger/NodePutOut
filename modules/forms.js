import { throws } from "assert";

class createElement {
    label = `<label for="your_name">Your name: </label>`
    error = `<span class="error">This field is required</span>`
    help_text = `<span class="help-text">Enter your name</span>`
    constructor(tagName) {
        this.tagName = tagName;
    }
    _() {
        let html;
        if (this.tagName == 'label') {
            html = `<lable `
            html += this.for ? ` for="${this.for}"` : '';
            html += this.l_class ? ` class="${this.l_class}"` : '';
            html += `>`;
            html += this.label ? this.label : '';
            html += this.error ? this.error : '';
            html += this.help_text ? this.help_text : '';
            html += `</lable>`;
        }
        if (this.tagName == 'input') {
            html = `<input`
            html += this.id ? ` id="${this.id}"` : '';
            html += this.class ? ` class="${this.class}"` : '';
            html += this.type ? ` type="${this.type}"` : '';
            html += this.maxlength ? ` maxlength="${this.maxlength}"` : '';
            html += this.minlength ? ` minlength="${this.minlength}"` : '';
            html += this.name ? ` name="${this.name}"` : '';
            html += this.value ? ` value="${this.value}"` : '';
            html += this.placeholder ? ` placeholder="${this.placeholder}"` : '';
            html += this.required ? ` required` : '';
            html += this.disabled ? ` disabled` : '';
            html += this.readonly ? ` readonly` : '';
            html += this.autofocus ? ` autofocus` : '';
            html += this.checked ? ` checked` : '';
            html += this.multiple ? ` multiple` : '';
            html += this.pattern ? ` pattern="${this.pattern}"` : '';
            html += this.step ? ` step="${this.step}"` : '';
            html += this.onchange ? ` onchange="${this.onchange}"` : '';
            html += this.onclick ? ` onclick="${this.onclick}"` : '';
            html += this.onfocus ? ` onfocus="${this.onfocus}"` : '';
            html += this.costom_attributes ? ` ${this.costom_attributes}` : '';
            html += `>`;
        }
        return html;

    }
}

class HtmlConstructor {
    _html;
    hc_html(type) {
        const _html = new createElement(type);
        _html.id = this.params.id;
        _html.type = this.params.type;
        _html.class = this.params.class;
        _html.max_length = this.params.maxlength;
        _html.min_length = this.params.minlength;
        _html.name = this.params.name;
        _html.required = this.params.required;
        _html.label = this.params.label;
        _html.l_class = this.params.l_class;
        _html.error = this.params.error;
        _html.help_text = this.params.help_text;
        _html.disabled = this.params.disabled;
        _html.name = this.params.name;
        _html.readonly = this.params.readonly;
        _html.autofocus = this.params.autofocus;
        _html.checked = this.params.checked;
        _html.multiple = this.params.multiple;
        _html.pattern = this.params.pattern;
        _html.for = this.params.name;
        _html.costom_attributes = this.params.costom_attributes;
        return _html._();
    }
    constructor(params) {
        this.params = params
    }
}


export class CharField extends HtmlConstructor {
    is_valid() {
        return true;
    }
    html;
    constructor(params) {
        params.type = params.type ? params.type : 'text';
        super(params)
        this.params = params
        this.html = {
            'input': this.hc_html('input'),
            'label': this.hc_html('label'),
        }
    }
}




export class Form {
    constructor(params) {
        params = params ? params : { url: '/', method: 'POST' };
        this.url = params.url ? params.url : '/';
        this.method = params.method ? params.method : 'POST';
        this.class = params.class ? params.class : 'form';
        if (!params.url) {
            throw new Error('url is required');
        }
        if (!params.method) {
            throw new SyntaxError('method is required');
        }
    }
    is_valid(params) {
        return true;
    }
    field() {
        let dict = {};
        for (let key in this) {
            if (this[key] instanceof CharField) {
                console.log(key);
                dict[key] = this[key].html;
                // this[key].html = this[key].hc_html('input');
            }
        }
        return dict;
    }
    html() {
        let content;
        // фор из всех переменны класса
        // перебираем переменные класса
        for (let key in this) {
            content = '\n'
            if (this[key] instanceof CharField) {
                content += this[key].html.input;
                // this[key].html = this[key].hc_html('input');
            }
            content += '\n'
        }

        return (`<form action="${this.url}" class="${this.class}">${content}</form>`);
    }
}