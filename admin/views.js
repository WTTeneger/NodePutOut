// import * as jwt from "./utils/JWT.js"
// import jwt from "../utils/JWT.js"
// import * as db from "./models_nosql.js"
import mongoose from "mongoose";
import generate_header from "../middleware/generate_header.js";
let db = mongoose.models



db.Item.init()
db.MarketItem.init()



export async function admin_base(req, res) {
    let res_data = generate_header(req, {
        page: 'base',
    })
    res.render('base.html', res_data);
}

export async function admin_index(req, res) {
    let res_data = generate_header(req, {
        // 'product': items,
        page: 'dashboard',
    })
    console.log(res_data);
    res.render('dashboard.html', res_data);
}

export async function admin_products(req, res) {
    let items = await db.Item.find({}).populate(['owner', 'rarity', 'type'])
    console.log(items[0]);
    let res_data = generate_header(req, {
        'items': items,
        page: 'items',
    })
    console.log(res_data);
    res.render('items.html', res_data);
}

export async function admin_item(req, res) {
    // взять переменную id из адрессной строки
    let id = req.query.id;
    console.log(id);
    if (!id) {
        res.redirect('/admin/items')
        return res;
    }
    let item = await db.Item.findById(id).populate(['owner', 'rarity', 'type'])
    let type = await db.Type.find({})
    let rarity = await db.Rarity.find({})
    let res_data = generate_header(req, {
        item: item,
        rarity: rarity,
        type: type,
        page: 'item',
    })
    console.log(res_data);
    res.render('item.html', res_data);
}


export async function _404_admin_page(req, res) {
    let res_data = generate_header(req, {
        page: '404',
    })
    console.log(res_data);
    res.render('404.html', res_data);
}



