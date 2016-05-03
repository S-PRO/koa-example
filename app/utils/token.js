/**
 * Created by alex on 03.05.16.
 */
import jwt from 'koa-jwt'
import Boom from 'boom'

export const TOKEN_CONFIG = {
    KEY: 'key',
    SECRET: 'secret',
    expires: '1m',
    alg: 'HS256'
};

export default class TokenService {
    static async tokenRequired(ctx, next) {
        try {
            let decoded = jwt.verify(ctx.headers.authorization, TOKEN_CONFIG.KEY);
            console.log('DECODED -->> ', decoded);
            if (decoded) await next();
            else throw Boom.unauthorized();
        } catch (e) {
            throw Boom.unauthorized(e);
        }
    }

    static generate(user) {
        return jwt.sign({pcw: user}, TOKEN_CONFIG.KEY, {
            expiresIn: TOKEN_CONFIG.expires,
            algorithm: TOKEN_CONFIG.alg
        })
    }
}