import jwt from 'jsonwebtoken'
import * as settings from '../settings.js'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const db = mongoose.models;

const onlyAuth = async (req, res, next) => {
    try {
        let token_jwt = req.cookies['JWT-Token'];

        if (token_jwt) {
            let token = jwt.verify(token_jwt, settings.JWT_SECRET);

            if (token.rights === 'admin' || token.rights === 'user') {
                console.log(`Доступ уровня - ${token.rights}`);
                let user = await db.Client.findById(token.id);
                req.user = user;
                console.log(`Пользователь ${req.user.name} авторизован`);
                next();
            } else {
                res.status(403).json({
                    message: 'Недостаточно прав',
                    err: ['you dont have rights']
                })
            }

        } else {
            res.status(401).json({
                message: 'Нет доступа',
                err: ['you are not authorized']
            })
        }
    } catch (e) {
        res.status(401).json({
            message: 'Нет доступа',
            err: e.message.split(', ')
        })
    }
}

export default onlyAuth;