import jwt from 'jsonwebtoken'
import fs from "fs";

// var privateKey = fs.readFileSync("./private.key");

function sleep(sec) {
    let ms = sec * 1000
    return new Promise(resolve => setTimeout(resolve, ms));
}

class JWT {
    JWT_created;

    constructor(_secret, _time_out_jwt, _time_out_rt) {
        if (JWT.JWT_created !== undefined) {
            return JWT.JWT_created
        }
        JWT.JWT_created = this
        this.secret = _secret
        this.time_out_jwt = _time_out_jwt
        this.time_out_rt = _time_out_rt
    }

    create_jwt(_data) {
        var data_jwt = Object.assign({}, _data, {
            'type': 'JWT',
            'iss': 'web',
            'sub': 'clientAccess',
        });
        let _jwt_t = jwt.sign(data_jwt, this.secret, { expiresIn: this.time_out_jwt });

        var data_rt = Object.assign({}, { 'jwt': _jwt_t }, {
            'type': 'RT',
            'iss': 'web',
            'sub': 'refreshToken',
        });
        let _rt_t = jwt.sign(data_rt, this.secret, { expiresIn: this.time_out_rt });
        return { _jwt_t, _rt_t }
    }
}

// let _jwt = new JWT(privateKey, "1h", "20d");
// let t = _jwt.create_jwt({ id: '12312', rights: 'user' });
// let worked = _jwt.check_worked_token(t)
// console.log('worked', worked)
// await sleep(5)
// worked = _jwt.check_worked_token(t)
// let data = _jwt.get_data_from_jwt(t)
// console.log('worked', worked)
// console.log('data', data)


// export default { _jwt }