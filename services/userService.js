import * as UserRepo from '../repository/user.js';
import { errorResp, successResp } from '../utils/response.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY_AT = "kelas.com";
const SECRET_KEY_RT = "andika.com";

export const getUsers = async (request, response, next) => {
    try {
        const [result] = await UserRepo.getData();
        successResp(response, "success", result)
    } catch (error) {
        next(error)
    }
}

export const createUser = async (request, resposne, next) => {
    try {
        let name = request.body.name; 
        let email = request.body.email;
        let password = request.body.password;

        const saltRound = 10;
        bcrypt.hash(password, saltRound, async (err, hash) => {
            const [result] = await UserRepo.createData(name, email, hash);
            let id = result.insertId;
            const [users] = await UserRepo.getDataById(id);
            successResp(resposne, "success create user", users[0], 201);
        })
    } catch(error) {
        next(error);
    }
}

export const authenticationUser = async (request, response, next) => {
    try {
        let email = request.body.email;
        let password = request.body.password;
        const [result] = await UserRepo.getDataByEmail(email);

        if (result.length > 0) {
            const user = result[0];

            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    let claims = {
                        id: user.user_id, 
                        name: user.name, 
                        email: user.email
                    };

                    const accessToken = jwt.sign(claims, SECRET_KEY_AT, {expiresIn:'15m'});
                    const refreshToken = jwt.sign(claims, SECRET_KEY_RT, {expiresIn:'30m'});
                    let data = {
                        access_token: accessToken, 
                        refresh_token: refreshToken
                    }
                    successResp(response, "berhasil login", data)
                }
            })
        } else {
            errorResp(response, "email atau password tidak cocok");
        }
    } catch(error) {
        next(error)
    }
}

