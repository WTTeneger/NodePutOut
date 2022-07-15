// import * as jwt from "./utils/JWT.js"
// import jwt from "../utils/JWT.js"
import jwt from 'jsonwebtoken'
// import JWT from "../utils/JWT";
// import * as db from "./models_nosql.js"
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import * as settings from "../settings.js";
var db = mongoose.models
console.log(db);

console.log('sett', settings);


export async function api_index(req, res) {
    console.log(mongoose.models.Product.find());
    // let res_data = generate_header({
    //     'product': await db.Product.find({}),
    // })

    res.status(200).json({
        message: 'все красиво'
    })
}

// функция создания продукта (только для админа)
export async function api_product_create(req, res) {
    try {
        let item = new db.Item({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            category: req.body.category,
            rarity: req.body.rarity,
            type: req.body.type,
        })
        let d = await db.Item.find({ name: req.body.name }).exec(console.log('err'));
        if (d.length > 0) {
            res.status(400).json({
                message: 'Предмет с таким названием уже есть (Измените название)',
                field: 'name',
            })
            return res;
        } else {
            console.log('ss');
            await item.save()
            res.status(200).json({
                message: 'Итем создан',
                data: item,
            })
        }
    } catch (error) {
        console.log("error", error)
        res.status(404).json({
            message: 'Не все поля заполнены'
        })
    }
}

// функция обновления продукта по id (только для админа) 
export async function api_product_update(req, res) {
    try {
        let item = await db.Item.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            category: req.body.category,
            rarity: req.body.rarity,
            type: req.body.type,
        })

        res.status(201).json({
            message: 'Итем обновлен',
            data: await item,
        })
    } catch (error) {
        console.log("error", error)
        res.status(400).json({
            message: 'Ошибка обновления',
            err: error
        })
    }
}

// функция удаления продукта (только для админа)
export async function api_product_delete(req, res) {
    try {
        let item = await db.Item.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: 'Итем удален',
            data: item,
        })
    } catch (error) {
        console.log("error", error)
        res.status(400).json({
            message: 'Ошибка удаления',
            err: error
        })
    }
}

// функция получения продукта по id
export async function api_product_by_id(req, res) {
    let res_data = {
        'product': await db.Item.findById(req.params.id).populate('owner'),
    }
    res.status(200).json(res_data)
}

// функция получения всех продуктов
export async function api_product_get_all(req, res) {
    let res_data = {
        'product': await db.Item.find({}),
    }
    res.status(200).json(res_data)
}

// функция создания продукта на маркете
export async function api_marketitem_create(req, res) {
    console.log('uid', uid);
    try {
        console.log(req.body);
        let item = new db.MarketItem({
            item: req.body.id,
            price: req.body.price,
            total_price: req.body.total_price,
        })
        // Если есть такой в бд выдать ошибку
        // найти Итем с таким id FindById
        let ItemInDB = await db.Item.findById({ _id: req.body.id });
        // console.log(ItemInDB);
        // let ItemInDB = await db.Item.find({ _id: req.body.id });
        console.log('ItemInDB', ItemInDB);
        if (ItemInDB == null) {
            res.status(400).json({
                message: 'Предмета с таким id нет в бд',
                field: 'name',
            })
            return res;
        }

        // let shopItemInDB = await db.MarketItem.find({ item: req.body.id });
        let shopItemInDB = await db.MarketItem.find({ item: req.body.id });
        console.log('shopItemInDB', shopItemInDB);
        if (shopItemInDB.length > 0) {
            res.status(400).json({
                message: 'Данный предмет уже есть в магазине',
                field: 'item',
            })
            return res;
        }
        console.log('ss');
        await item.save()
        res.status(200).json({
            message: 'Итем магазина создан',
            data: item,
        })
    }
    catch (error) {
        console.log("error", error)
        res.status(400).json({
            message: 'Не все поля заполнены'
        })
    }
}

// функция создания пользователя
export async function api_user_create(req, res) {
    const salt = await bcrypt.genSalt(12);
    try {
        let user = new db.Client({
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, salt),
            balance: 0,
        })

        let d = await db.Client.find({ $or: [{ email: req.body.email }, { name: req.body.name }] });
        if (d.length > 0) {
            res.status(400).json({
                message: 'Пользователь с таким email или name уже есть (Измените эти данные)',
                field: ['email', 'name'],
            })
            return res;
        } else {
            console.log('ss');
            await user.save()
            res.status(200).json({
                message: 'Пользователь создан',
                data: user,
            })
        }
    } catch (error) {
        res.status(400).json({
            message: 'Не все поля заполнены',
            err: error.message.split(', ')
        })
    }
}

// функция получения пользователя по id
export async function api_user_by_id(req, res) {
    try {
        let res_data = {
            'user': await db.Client.findById(req.params.id, {}),
        }
        res.status(200).json(res_data)
    } catch (error) {
        console.log("error", error)
        res.status(404).json({
            message: 'Ошибка поиска',
            err: error.message
        })
    }
}

// функция удаления пользователя
export async function api_user_delete(req, res) {
    try {
        let user = await db.Client.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: 'Пользователь удален',
            data: user,
        })
    } catch (error) {
        console.log("error", error)
        res.status(400).json({
            message: 'Ошибка удаления',
            err: error
        })
    }
}
//

// функция авторизации пользователя которая возвращает jwt и refresh token
export async function api_user_login(req, res) {
    try {
        console.log(req.body);
        let user = await db.Client.findOne({ email: req.body.email })
        if (user == null) {
            res.status(400).json({
                message: 'Пользователя с таким email нет в бд',
                field: 'email',
            })
            return res;
        }
        let result = await bcrypt.compare(req.body.password, user.password)
        console.log(result);
        if (result == false) {
            res.status(400).json({
                message: 'Неверный пароль',
                field: 'password',
            })
            return res;
        }
        let JWT_SECRET = 'secret';
        let REFRESH_JWT_SECRET = 'secret';
        let token = jwt.sign({ id: user._id, rights: user.rights }, settings.JWT_SECRET, { expiresIn: settings.JWT_JWT_TA })
        let refreshToken = jwt.sign({ id: user._id }, settings.RT_SECRET, { expiresIn: settings.JWT_RT_TA })
        user.refresh_token = refreshToken;
        user.save();
        res.cookie('JWT-Token', token, { maxAge: 90_000_000, httpOnly: true })
        res.status(200).json({
            message: 'Авторизация прошла успешно',
            data: {
                token: token,
                refreshToken: refreshToken,
            },
            code: '0002'
        })
    } catch (error) {
        console.log("error", error)
        res.status(400).json({
            message: 'Не все поля заполнены',
            err: error.message.split(', ')
        })
    }
}

// функция деавторизации пользователя
export async function api_user_logout(req, res) {
    try {
        console.log("user");
        console.log(req.user);
        req.user.refresh_token = null;
        await req.user.save()
        res.clearCookie('JWT-Token')
        res.clearCookie('RT-Token')
        res.status(200).json({
            message: 'Вы вышли из системы',
        })
    } catch (error) {
        // console.log("error", error)
        res.status(400).json({
            message: 'Не все поля заполнены',
            err: error.message.split(', ')
        })
    }
}



// функция для обновления токена пользователя
export async function api_user_refresh(req, res) {
    try {
        let data_from_token = jwt.verify(req.body.refreshToken, settings.RT_SECRET);
        console.log(data_from_token);
        let user = await db.Client.findOne({ id: data_from_token.id, refresh_token: req.body.refreshToken })
        if (user == null) {
            res.status(400).json({
                message: 'Неверный refresh token',
                field: 'refreshToken',
            })
            return res;
        }
        let JWT_SECRET = 'secret';
        let token = jwt.sign({ id: user._id, rights: user.rights }, settings.JWT_SECRET, { expiresIn: settings.JWT_JWT_TA })
        let refresh_token = jwt.sign({ id: user._id }, settings.RT_SECRET, { expiresIn: settings.JWT_RT_TA })
        user.refresh_token = refresh_token;
        user.save();
        res.cookie('JWT-Token', token, { maxAge: 90_000_000, httpOnly: true })
        res.status(200).json({
            message: 'Токен обновлен',
            data: {
                token: token,
                refreshToken: refresh_token,
            },
            code: '0001'
        })
    } catch (error) {
        // console.log("error", error)
        res.status(400).json({
            message: 'Не все поля заполнены',
            err: error.message.split(', ')
        })
    }
}

// функция для получения всех пользователей
export async function api_user_get_all(req, res) {
    try {
        let users = await db.Client.find({})
        res.status(200).json({
            message: 'Пользователи получены',
            data: users,
        })
    } catch (error) {
        console.log("error", error)
        res.status(400).json({
            message: 'Не все поля заполнены',
            err: error.message.split(', ')
        })
    }
}