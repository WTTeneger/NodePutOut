import { Form, CharField } from "./forms.js"


export class MyF extends Form {
    constructor(params) {
        super(params)
    }
    login = new CharField({ name: "login", max_length: 21, min_length: 4, required: true, type: 'text' });
    password = new CharField({ name: "password", max_length: 21, min_length: 4, required: true, type: 'password' });
}
