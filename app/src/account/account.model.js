/**
 * Created by alex on 03.05.16.
 */

import AccountSchema from './account.schema'
import PasswordService from './../../utils/password'

export default class AccountModel {

    static async fetch(params) {
        return await AccountSchema.findOne(params).exec();
    }

    static async register(user) {
        let account = new AccountSchema({
            email: user.email,
            password: PasswordService.crypt(user.password)
        });
        return await account.save();
    }
}