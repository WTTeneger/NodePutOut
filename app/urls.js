import Router from "express";
import * as views from './views.js';
import {fileURLToPath} from "url";
import {dirname} from "path";
import nunjucks from 'nunjucks'
import cors from 'cors'
import express from "express";
import path from 'path';

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

router.get('/', views.app_index)
router.get('/account', views.app_account)
router.get('/auth', views.app_auth)


export default router;