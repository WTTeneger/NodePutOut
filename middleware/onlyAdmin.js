import jwt from 'jsonwebtoken'
import * as settings from '../settings.js'
import onlyAuth from './onlyAuth.js';
import mongoose from 'mongoose';

const db = mongoose.models;

const onlyAdmin = async (req, res, next) => {
    try {
        if (req.user.rights === 'admin') {
            next();
        } else {
            res.status(403).json({
                message: 'Недостаточно прав',
                err: ['you dont have rights']
            })
        }
    } catch (e) {
        res.status(401).json({
            message: 'Не авторизован',
            err: ['you are not authorized']
        })
    }
}
export default onlyAdmin;