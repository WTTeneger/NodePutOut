// import * as jwt from "./utils/JWT.js"
import jwt from "../utils/JWT.js"



console.log(jwt)

function generate_header(_header) {
    let data = {
        'title': 'LT',
        'page': 'Market',
    }
    var res = Object.assign({}, _header, data);
    return res
}

async function app_index(req, res) {
    let res_data = generate_header({
        'product': [
            {
                'title': 'Witch Broom',
                'price': '7.20',
                'total_price': '14.50',
                'rarity': 'RARE',
                'type': 'Accessory',
                'image': '/img/new6-img.png',
            },
            {
                'title': 'Haunted House',
                'price': '10.20',
                'total_price': '29.99',
                'rarity': 'UNCOMON',
                'type': 'House',
                'image': '/img/new1-img.png',
            },
            {
                'title': 'Halloween Candle',
                'price': '12.20',
                'total_price': '15.50',
                'rarity': 'RARE',
                'type': 'Accessory',
                'image': '/img/new2-img.png',
            },
            {
                'title': 'Captain Sem',
                'price': '4.90',
                'total_price': '9.99',
                'rarity': 'EPIC',
                'type': 'Accessory',
                'image': '/img/home3-img.png',
            },
            {
                'title': 'Rip',
                'price': '100',
                'total_price': '',
                'rarity': 'RARE',
                'type': 'Accessory',
                'image': '/img/new4-img.png',
            },
            {
                'title': 'Terrifying Crystal Ball',
                'price': '500',
                'total_price': '',
                'rarity': 'BASE',
                'type': 'Accessory',
                'image': '/img/new5-img.png',
            },
            {
                'title': '1 more test',
                'price': '500',
                'total_price': '',
                'rarity': 'BASE',
                'type': 'Hard',
                'image': '/img/new2-img.png',
            },
        ]
    })

    res.render('catalog.html', res_data);
}

async function app_account(req, res) {
    let res_data = generate_header({})

    res.render('catalog.html', res_data);
}

async function app_auth(req, res) {
    console.log('req.cookies', req.cookies.JWToken)
    jwt._jwt.check_worked_token(req.cookies.JWToken)

    let res_data = generate_header({})
    let tokens = jwt._jwt.create_jwt({'id_user': '515wa'})
    console.log(tokens)
    res.cookie('RTtoken', tokens._rt_t)
    res.cookie('JWToken', tokens._jwt_t)
    res.render('catalog.html', res_data);
}


export {app_index, app_account, app_auth};

