import { Router } from "express";
import * as views from './views.js';

const router = new Router();
router.get('/', views._404_page)


export default router;