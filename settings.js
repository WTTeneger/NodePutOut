import jwt from 'jsonwebtoken'
import fs from "fs";
import dotenv from 'dotenv'

dotenv.config()


export var JWT_SECRET = fs.readFileSync('./keys/jwt.key');
export var RT_SECRET = fs.readFileSync('./keys/rt.key');
export var JWT_JWT_TA = process.env.JWT_JWT_TA;
export var JWT_RT_TA = process.env.JWT_RT_TA;


