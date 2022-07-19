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
import logger from '../middleware/logger.js';
import onlyAdmin from '../middleware/onlyAdmin.js';
import onlyAuth from '../middleware/onlyAuth.js';
import onlyNoAuth from '../middleware/onlyNoAuth.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = new Router();

router.set('view engine', 'html')
router.use('/', express.static(path.join(__dirname, '/assets')))

router.use(cors())
router.use(logger)


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

// routers 
router.get('/', views.api_index)
//Роутер для создания продукта
router.post('/product', [onlyAuth, onlyAdmin], views.api_product_create)
//Роутер для получание продукта по id
router.get('/product/:id', onlyAuth, views.api_product_by_id)
//Роутер для редактирования продукта
router.put('/product/:id', [onlyAuth, onlyAdmin], views.api_product_update)
// роутер для удаление продукта пр id
router.delete('/product/:id', [onlyAuth, onlyAdmin], views.api_product_delete)
router.delete('/marketitem/:id', [onlyAuth, onlyAdmin], views.api_marketitem_delete)
// Роутер для получания всех продуктов
router.get('/product', onlyAuth, views.api_product_get_all)
// Роутер для получания всех продуктов маркета
router.get('/marketitem', onlyAuth, views.api_marketitem_get_all)
// Роутер для создания итема магазина
router.post('/marketitem', [onlyAuth, onlyAdmin], views.api_marketitem_create)
// Роутер для покупки товара по id
router.post('/marketitem/:id', [onlyAuth], views.api_marketitem_buy)

// Роутер для создания типа предмета
router.post('/type', [onlyAuth, onlyAdmin], views.api_type_create)
// Роутер для удаления типа предмета
router.delete('/type/:id', [onlyAuth, onlyAdmin], views.api_type_delete)
// Роутер для получания всех типов предметов
router.get('/type', onlyAuth, views.api_type_get_all)

// Роутер для создания rarity предмета
router.post('/rarity', [onlyAuth, onlyAdmin], views.api_rarity_create)
// Роутер для удаления rarity предмета
router.delete('/rarity/:id', [onlyAuth, onlyAdmin], views.api_rarity_delete)
// Роутер для получания всех rarity предметов
router.get('/rarity', onlyAuth, views.api_rarity_get_all)

// роутер для создания пользователя
router.post('/user', views.api_user_create)
// роутер для получения пользователя по id
router.get('/user/:id', onlyAuth, views.api_user_by_id)
// роутер для редактирования пользователя
router.put('/user/:id', [onlyAuth, onlyAdmin], views.api_user_update)
// роутер для удаления пользователя по id
router.delete('/user/:id', [onlyAuth, onlyAdmin], views.api_user_delete)
// роутер для авторизации пользователя
router.post('/user/login', views.api_user_login)
// роутер для деавторизации 
router.post('/user/logout', onlyAuth, views.api_user_logout)
// роутер для обновления jwt и refrest token
router.put('/user/refresh', onlyAuth, views.api_user_refresh)
// роутер для получения всех пользователей
router.get('/users', [onlyAuth, onlyAdmin], views.api_user_get_all)


export default router;

