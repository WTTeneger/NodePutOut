import jwt from 'jsonwebtoken'
import * as settings from '../settings.js'
import onlyAuth from './onlyAuth.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const db = mongoose.models;

const setUserInReq = async (req, res, next) => {
    try {
        let token_jwt = req.cookies['JWT-Token'];

        if (token_jwt) {
            let token = jwt.verify(token_jwt, settings.JWT_SECRET);
            let user = await db.Client.findById(token.id);
            req.user = user;
        } else {
            req.user = undefined;
        }
    } catch (e) {
        req.user = undefined;
    }

    next()
}
export default setUserInReq;