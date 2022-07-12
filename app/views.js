// import * as jwt from "./utils/JWT.js"
// import jwt from "../utils/JWT.js"
import * as db from "./models_nosql.js"
import mongoose from "mongoose";


// console.log(mongoose.model);

db.Item.init()
db.MarketItem.init()

// console.log(jwt)

function generate_header(_header) {
    let data = {
        'title': 'LT',
        'page': 'Market',
    }
    var res = Object.assign({}, _header, data);
    return res;
}
async function app_index(req, res) {
    let items = await db.MarketItem.find({})
        .populate(
            {
                path: 'item',
                populate: {
                    path: "owner" // in blogs, populate comments
                }
            })

    // console.log('items founds');
    // 
    let res_data = generate_header({
        'product': items,
    })

    res.render('catalog.html', res_data);
}

// Функция получения продукта по id
export async function app_product(req, res) {
    let id = req.params.id;
    let item = await db.MarketItem.findById(id)
        .populate(
            {
                path: 'item',
                populate: {
                    path: "owner" // in blogs, populate comments
                }
            })
    let res_data = generate_header({
        'product': item,
    })
    res.render('product.html', res_data);
}


async function app_account(req, res) {
    let res_data = generate_header({})

    res.render('catalog.html', res_data);
}

async function app_auth(req, res) {
    console.log('req.cookies', req.cookies.JWToken)
    jwt._jwt.check_worked_token(req.cookies.JWToken)

    let res_data = generate_header({})
    let tokens = jwt._jwt.create_jwt({ 'id_user': '515wa' })
    console.log(tokens)
    // res.cookie('RTtoken', tokens._rt_t)
    // res.cookie('JWToken', tokens._jwt_t)
    // res.render('catalog.html', res_data);

    const jane = await db.User.create({
        username: 'amal',
        birthday: new Date(1980, 6, 20),
    });

    const users = await db.User.findAll();
    console.log('ALL USER');
    console.log('\n\n');
    console.log(users);


}


export { app_index, app_account, app_auth };

