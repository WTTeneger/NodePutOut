import jwt from 'jsonwebtoken'
import fs from "fs";

var privateKey = fs.readFileSync('./utils/private.key');

function sleep(sec) {
    let ms = sec * 1000
    return new Promise(resolve => setTimeout(resolve, ms));
}

class JWT {
    JWT_created;

    constructor(_secret, _time_out) {
        console.log(JWT.JWT_created)
        if (JWT.JWT_created !== undefined) {
            return JWT.JWT_created
        }
        JWT.JWT_created = this
        this.secret = _secret
        this.time_out = _time_out
    }

    create_jwt(_data) {
        var data_jwt = Object.assign({}, _data, {
            'type': 'JWT',
            'iss': 'web',
            'sub': 'clientAccess',
        });
        let _jwt_t = jwt.sign(data_jwt, this.secret, {expiresIn: this.time_out});


        var data_rt = Object.assign({}, {'jwt': _jwt_t}, {
            'type': 'RT',
            'iss': 'web',
            'sub': 'refreshToken',
        });
        let _rt_t = jwt.sign(data_rt, this.secret);
        return {_jwt_t, _rt_t}
    }

    get_data_from_jwt(token) {
        let a = jwt.verify(token, this.secret, function (err, decoded) {
            console.log(err, decoded)
            if (err) {
                return null
            }
            if (decoded) {
                return decoded
            }
        })
        return a
    }

    check_worked_token(token) {
        return jwt.verify(token, this.secret, function (err, decoded) {
            console.log(err, decoded)
            if (err) {
                return false
            }
            if (decoded) {
                return true
            }
        })
    }
}

let _jwt = new JWT(privateKey, "3s");
// let t = _jwt.create_jwt({'a': 'vasia'});
// let worked = _jwt.check_worked_token(t)
// console.log('worked', worked)
// await sleep(5)
// worked = _jwt.check_worked_token(t)
// let data = _jwt.get_data_from_jwt(t)
// console.log('worked', worked)
// console.log('data', data)


export default {_jwt}