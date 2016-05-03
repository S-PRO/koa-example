/**
 * Created by alex on 03.05.16.
 */

import AccountModel from './account.model'
import ProfileModel from './../profile/profile.model'

export default class AccountController {
    static async register(ctx) {
        let _user = ctx.request.body;
        let account = await AccountModel.register(_user);
        ctx.body = await ProfileModel.create(_user, account);
    }
}