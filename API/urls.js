import Router from "express";
import * as views from './views.js';
import { fileURLToPath } from "url";
import { dirname } from "path";
import nunjucks from 'nunjucks'
import cors from 'cors'
import express from "express";
import path from 'path';
import jwt from 'jsonwebtoken';
import * as settings from "../settings.js";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = new Router();

console.log(__dirname)
router.set('view engine', 'html')
router.use('/', express.static(path.join(__dirname, '/assets')))

router.use(cors())


router.use(cookieParser());

nunjucks.configure(__dirname + '/templates', {
    autoescape: true, express: router
})

router.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// функция декоратор для проверки прав доступа
function __onlyAdmin(f, content) {
    return function () {
        try {
            let token_jwt = arguments[0].headers.authorization ? arguments[0].headers.authorization.split(' ')[1] : null;
            console.log(token_jwt);
            if (token_jwt) {
                let token = jwt.verify(token_jwt, settings.JWT_SECRET);
                console.log(token);
                if (token.rights === 'admin') {
                    console.log(`Доступ уровня -- ${token.rights}`);
                    return f.apply(this, arguments);
                }
                arguments[0].res.status(403).json({
                    message: 'Недостаточно прав',
                    err: ['you dont have rights']
                })
            } else {
                arguments[0].res.status(401).json({
                    message: 'Нет доступа',
                    err: ['you are not authorized']
                })
            }
        } catch (e) {
            arguments[0].res.status(401).json({
                message: 'Нет доступа',
                err: e.message.split(', ')
            })
        }
    }
}
// функция декоратор для проверки авторизации пользователя
function __onlyAuth(f, content) {
    return function () {
        try {
            let token_jwt = arguments[0].headers.authorization ? arguments[0].headers.authorization.split(' ')[1] : null;
            console.log(token_jwt);
            if (token_jwt) {
                let token = jwt.verify(token_jwt, settings.JWT_SECRET);
                console.log(token);
                if (token.rights === 'admin' || token.rights === 'user') {
                    console.log(`Доступ уровня - ${token.rights}`);
                    return f.apply(this, arguments);
                }
                arguments[0].res.status(403).json({
                    message: 'Недостаточно прав',
                    err: ['you dont have rights']
                })
            } else {
                arguments[0].res.status(401).json({
                    message: 'Нет доступа',
                    err: ['you are not authorized']
                })
            }
        } catch (e) {
            arguments[0].res.status(401).json({
                message: 'Нет доступа',
                err: e.message.split(', ')
            })
        }
    }
}


// routers 
router.get('/', views.api_index)
//Роутер для создания продукта
router.post('/product', __onlyAdmin(views.api_product_create))
//Роутер для получание продукта по id
router.get('/product/:id', views.api_product_by_id)
//Роутер для редактирования продукта
router.put('/product/:id', views.api_product_update)
// роутер для удаление продукта пр id
router.delete('/product/:id', views.api_product_delete)
// Роутер для получания всех продуктов
router.get('/product', views.api_product_get_all)
// Роутер для создания итема магазина
router.post('/marketitem', views.api_marketitem_create)


// роутер для создания пользователя
router.post('/user', views.api_user_create)
// роутер для получения пользователя по id
router.get('/user/:id', __onlyAuth(views.api_user_by_id))
// роутер для удаления пользователя по id
router.delete('/user/:id', views.api_user_delete)
// роутер для авторизации пользователя
router.post('/user/login', views.api_user_login)
// роутер для обновления jwt и refrest token
router.put('/user/refresh', __onlyAuth(views.api_user_refresh))
// роутер для получения всех пользователей
router.get('/user', views.api_user_get_all)

export default router;

