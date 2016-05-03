/**
 * Created by alex on 03.05.16.
 */
import Boom from 'boom'

import AccountModel from './../account/account.model'
import ProfileModel from './../profile/profile.model'
import PasswordService from './../../utils/password'
import TokenService from './../../utils/token'

export default class LoginController {

    static async login(ctx) {
        let error = Boom.badData('Email or password is not correct');
        let body = ctx.request.body;

        /**
         * Find account.
         */
        let account = await AccountModel.fetch({email: body.email});
        /**
         * Check if data is correct.
         */
        if (!account || !PasswordService.compare(body.password, account.password)) throw error;
        /**
         * Get profile.
         */
        let profile = await ProfileModel.fetch({account: account._id});
        /**
         * Generate token.
         */
        let token = TokenService.generate(account._id);
        ctx.body = {token, profile};
    }
}