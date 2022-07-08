import {Router} from "express";
import * as views from './views.js';

const router = new Router();
router.get('/', views.main_page)


export default router;