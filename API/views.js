// import * as jwt from "./utils/JWT.js"
// import jwt from "../utils/JWT.js"
import jwt from 'jsonwebtoken'
// import JWT from "../utils/JWT";
// import * as db from "./models_nosql.js"
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import * as settings from "../settings.js";
import logger from '../middleware/logger.js';
var db = mongoose.models
import generate_header from "../middleware/generate_header.js";




export async function api_index(req, res) {

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
        let owner = req.body.owner ? req.body.owner : null;
        let item = new db.Item({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            category: req.body.category,
            rarity: req.body.rarity,
            type: req.body.type,
        })
        item.owner = owner
        let d = db.Item.find({ name: req.body.name }).exec(console.log('err'));
        if (d.length > 0) {
            res.status(400).json({
                message: 'Предмет с таким названием уже есть (Измените название)',
                field: 'name',
            })
            return res;
        } else {

            await item.save()
            res.status(200).json({
                message: 'Итем создан',
                data: item,
            })
        }
    } catch (error) {

        res.status(404).json({
            message: 'Не все поля заполнены'
        })
    }
}

// функция обновления продукта по id (только для админа) 
export async function api_product_update(req, res) {
    try {
        let item = await db.Item.findById(req.params.id)
        console.log(req.body);
        if (item) {
            if (req.body.name) {
                item.name = req.body.name
            }
            if (req.body.description) {
                item.description = req.body.description
            }
            if (req.body.image) {
                item.image = req.body.image
            }
            if (req.body.category) {
                item.category = req.body.category
            }
            if (req.body.rarity) {
                let rt_id = await db.Rarity.findOne({ name: req.body.rarity })
                item.rarity = rt_id
            }
            if (req.body.type) {
                let tp_id = await db.Type.findOne({ name: req.body.type })
                item.type = tp_id
            }
            console.log(item);
            await item.save()
            res.status(200).json({
                message: 'Итем обновлен',
                data: item,
            })
        } else {
            res.status(404).json({
                message: 'Итем не найден',
            })
        }
    } catch (error) {
        // console.log(error);
        res.status(400).json({
            message: 'Ошибка обновления',
            err: error
        })
    }
}

// функция удаления продукта (только для админа)
export async function api_product_delete(req, res) {
    try {

        let item = await db.Item.findById(req.params.id)
        let marketitem = await db.MarketItem.findOne({ item: item.id })


        if (item) {
            // await db.MarketItem.deleteMany({ item: item.id })
            await item.remove()
            await marketitem.remove()
            res.status(200).json({
                message: 'Итем удален',
                data: item,
            })
        } else {
            res.status(404).json({
                message: 'Итем не найден',
                field: 'id',
            })
        }

    } catch (error) {

        res.status(400).json({
            message: 'Ошибка удаления',
            err: error
        })
    }
}

export async function api_marketitem_delete(req, res) {
    try {
        let item = await db.MarketItem.findById(req.params.id)
        if (item) {
            await item.remove()
            res.status(200).json({
                message: 'Итем удален',
                data: item,
            })
        } else {
            res.status(404).json({
                message: 'Итем не найден',
                field: 'id',
            })
        }

    } catch (error) {

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

// функция получения всех маркет итемовы
export async function api_marketitem_get_all(req, res) {
    let res_data = {
        'product': await db.MarketItem.find({})
    }
    res.status(200).json(res_data)
}

// функция создания продукта на маркете
export async function api_marketitem_create(req, res) {
    try {

        let item = new db.MarketItem({
            item: req.body.id,
            price: req.body.price,
            total_price: req.body.total_price,
        })
        // Если есть такой в бд выдать ошибку
        // найти Итем с таким id FindById
        let ItemInDB = await db.Item.findById({ _id: req.body.id });
        // 
        // let ItemInDB = await db.Item.find({ _id: req.body.id });

        if (ItemInDB == null) {
            res.status(400).json({
                message: 'Предмета с таким id нет в бд',
                field: 'name',
            })
            return res;
        }

        // let shopItemInDB = await db.MarketItem.find({ item: req.body.id });
        let shopItemInDB = await db.MarketItem.find({ item: req.body.id });

        if (shopItemInDB.length > 0) {
            res.status(400).json({
                message: 'Данный предмет уже есть в магазине',
                field: 'item',
            })
            return res;
        }

        await item.save()
        res.status(200).json({
            message: 'Итем магазина создан',
            data: item,
        })
    }
    catch (error) {

        res.status(400).json({
            message: 'Не все поля заполнены'
        })
    }
}

// функция покупки продукта на маркете по id которая вычетает баланс и передает предмет покупателю
export async function api_marketitem_buy(req, res) {
    try {
        let item = await db.MarketItem.findById(req.params.id).populate(
            {
                path: 'item',
                populate: {
                    path: 'owner',
                },
            })
        let user = req.user;
        if (item == null) {
            res.status(404).json({
                message: 'Предмета с таким id нет в бд',
                field: 'name',
            })
            return res;
        }
        if (item.item.owner.id == user.id) {
            res.status(400).json({
                message: 'Вы не можете покупать этот предмет',
                field: 'name',
            })
            return res;
        }
        if (user.balance < item.price) {
            res.status(400).json({
                message: 'Недостаточно средств',
                field: 'balance',
            })
            return res;
        }

        user.balance -= item.price;
        user.save()
        item.item.owner.balance += item.price;
        item.item.owner.save()
        item.item.owner = user;
        item.item.save()
        await db.MarketItem.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: 'Предмет куплен',
            data: item.item,
            code: '0003',
            url: '/app/account/'
        })
    }
    catch (error) {

        res.status(400).json({
            message: 'Ошибка покупки',
            err: error
        })
    }
}

export async function api_type_create(req, res) {
    try {
        let type = new db.Type({
            name: req.body.name,
            image: req.body.image ? req.body.image : null,
        })
        await type.save()
        res.status(200).json({
            message: 'Тип создан',
            data: type,
        })
    }
    catch (error) {

        res.status(400).json({
            message: 'Ошибка создания',
            err: error
        })
    }
}

export async function api_type_delete(req, res) {
    try {
        let type = await db.Type.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: 'Тип удален',
            data: type,
        })
    }
    catch (error) {

        res.status(400).json({
            message: 'Ошибка удаления',
            err: error
        })
    }
}

export async function api_type_get_all(req, res) {
    let res_data = {
        'type': await db.Type.find({})
    }
    res.status(200).json(res_data)
}

export async function api_rarity_create(req, res) {
    try {
        let rarity = new db.Rarity({
            name: req.body.name,
            image: req.body.image ? req.body.image : null,
        })
        await rarity.save()
        res.status(200).json({
            message: 'Редкость создана',
            data: rarity,
        })
    }
    catch (error) {

        res.status(400).json({
            message: 'Ошибка создания',
            err: error
        })
    }

}

export async function api_rarity_delete(req, res) {
    try {
        let rarity = await db.Rarity.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: 'Редкость удалена',
            data: rarity,
        })
    } catch (error) {
        res.status(400).json({
            message: 'Ошибка удаления',
            err: error
        })
    }
}

export async function api_rarity_get_all(req, res) {
    let res_data = {
        'rarity': await db.Rarity.find({})
    }
    res.status(200).json(res_data)
}

// функция создания пользователя
export async function api_user_create(req, res) {
    const salt = await bcrypt.genSalt(12);
    try {
        let user = new db.Client({
            name: req.body.name,
            email: req.body.email,
            rights: req.body.rights,
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

        res.status(404).json({
            message: 'Ошибка поиска',
            err: error.message
        })
    }
}

// функция обновления пользователя по id
export async function api_user_update(req, res) {
    try {
        let user = await db.Client.findById(req.params.id, {})
        if (user == null) {
            res.status(404).json({
                message: 'Пользователя с таким id нет в бд',
                field: 'id',
            })
        }
        if (req.body.password) {
            const salt = await bcrypt.genSalt(12);
            user.password = await bcrypt.hash(req.body.password, salt);
        }
        if (req.body.name) {
            user.name = req.body.name;
        }
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.balance) {
            user.balance = req.body.balance;
        }
        if (req.body.image) {
            user.image = req.body.image;
        }
        await user.save()
        res.status(200).json({
            message: 'Пользователь обновлен',
            data: user,
        })
    } catch (error) {

        res.status(404).json({
            message: 'Ошибка обновления',
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

        let user = await db.Client.findOne({ email: req.body.email })

        if (user == null) {
            res.status(400).json({
                message: 'Пользователя с таким email нет в бд',
                field: 'email',
            })
            return res;
        }
        let result = await bcrypt.compare(req.body.password, user.password)
        if (result == false) {
            res.status(400).json({
                message: 'Неверный пароль',
                field: 'password',
            })
            return res;
        }
        let JWT_SECRET = 'secret';
        let REFRESH_JWT_SECRET = 'secret';
        let token = jwt.sign({ id: user.id, rights: user.rights }, settings.JWT_SECRET, { expiresIn: settings.JWT_JWT_TA })
        let refreshToken = jwt.sign({ id: user.id }, settings.RT_SECRET, { expiresIn: settings.JWT_RT_TA })
        user.refresh_token = refreshToken;
        user.save();

        res.cookie('JWT-Token', token, { maxAge: 90_000_000, httpOnly: true })
        res.status(200).json({
            message: 'Авторизация прошла успешно',
            data: {
                token: token,
                refreshToken: refreshToken,
            },
            code: '0002',
            url: '/app'
        })
    } catch (error) {

        res.status(400).json({
            message: 'Не все поля заполнены',
            err: error.message.split(', ')
        })
    }
}

// функция деавторизации пользователя
export async function api_user_logout(req, res) {
    try {


        req.user.refresh_token = null;
        await req.user.save()
        res.clearCookie('JWT-Token')
        res.clearCookie('RT-Token')
        res.status(200).json({
            message: 'Вы вышли из системы',
        })
    } catch (error) {
        // 
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
        // 
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

        res.status(400).json({
            message: 'Не все поля заполнены',
            err: error.message.split(', ')
        })
    }
}