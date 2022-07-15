// import * as jwt from "./utils/JWT.js"
// import jwt from "../utils/JWT.js"
import * as db from "./models_nosql.js"
import mongoose from "mongoose";
import * as form from "../modules/myform.js"

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
export async function app_item(req, res) {
    let id = req.params.id;
    let item = await db.Item.findById(id).populate({ path: 'owner' })
    let itemShop = await db.MarketItem.findOne({ item: item.id })
    console.log(item);
    console.log(itemShop);
    let res_data = generate_header({
        'item': item,
        'shop': itemShop,
        'test': true,
    })
    res.render('product.html', res_data);
}


async function app_account(req, res) {
    let res_data = generate_header({})

    res.render('catalog.html', res_data);
}

async function app_auth(req, res) {
    // let item = await db.Item.findById(id).populate({ path: 'owner' })
    // console.log(item);
    // console.log(itemShop);
    const mf = new form.MyF({ url: 'amal/sda', method: 'POST', class: 'form' });
    // console.log(mf.field())

    let res_data = generate_header({
        'form': mf,
        'test': true,
    })
    res.render('auth.html', res_data);
}


export { app_index, app_account, app_auth };

