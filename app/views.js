// import * as jwt from "./utils/JWT.js"
// import jwt from "../utils/JWT.js"
import * as db from "./models_nosql.js"
import mongoose from "mongoose";
import * as form from "../modules/myform.js"
import generate_header from "../middleware/generate_header.js";


db.Item.init()
db.MarketItem.init()


async function app_index(req, res) {
    let items = await db.MarketItem.find({})
        .populate(
            {
                path: 'item',
                populate: ['owner', 'rarity', 'type']
                // path: ["owner", 'rarity'], // in blogs, populate comments
                // path: 'rarity',
                // }
            })


    // 
    let res_data = generate_header(req, {
        'product': items,
        page: 'catalog',
    })

    res.render('catalog.html', res_data);
}

// Функция получения продукта по id
export async function app_item(req, res) {
    let id = req.params.id;
    let item = await db.Item.findById(id).populate(['owner', 'rarity', 'type'])
    let itemShop = await db.MarketItem.findOne({ item: item.id })


    let res_data = generate_header(req, {
        'item': item,
        'shop': itemShop,
        'test': true,
        page: item.name
        // 'page': 'product'
    })
    res.render('product.html', res_data);
}


async function app_account(req, res) {
    let items = await db.Item.find({ owner: req.user.id }).populate({ path: 'owner' })
    let res_data = generate_header(req, {
        page: 'account',
        product: items,

    })

    res.render('account.html', res_data);
}

async function app_login(req, res) {
    let res_data = generate_header(req, {
        test: true,
        page: "login"
    })
    res.render('auth.html', res_data);
}

// функция выхода из аккаунта
async function app_logout(req, res) {
    res;
    try {
        req.user.refresh_token = null;
        await req.user.save()
        res.clearCookie('JWT-Token')
        res.clearCookie('RT-Token')
        res.redirect('/app/')
    } catch (error) {
        res.redirect('/app/')
    }
    return res;
}


export { app_index, app_account, app_login, app_logout };

