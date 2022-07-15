import jwt from 'jsonwebtoken'
import * as settings from '../settings.js'
import onlyAuth from './onlyAuth.js';
import mongoose from 'mongoose';

const db = mongoose.models;

const onlyNoAuth = async (req, res, next) => {
    try {
        let token_jwt = req.cookies['JWT-Token'];
        console.log(token_jwt);
        // console.log(req);
        let token_data = jwt.verify(token_jwt, settings.JWT_SECRET);
        console.log(token_data);
        if (token_data) {
            res.redirect('/app');
            return res
        } else {
            next()
        }

    } catch (e) {
        next()
    }
}

export default onlyNoAuth;