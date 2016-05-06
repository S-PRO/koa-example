/**
 * Created by alex on 03.05.16.
 */
import ProfileSchema from './profile.schema'
import _ from 'lodash'
import Boom from 'boom';

export default class ProfileModel {
    static async fetch(params) {
        if (!params || !_.isPlainObject(params)) throw Boom.badData();
        return await ProfileSchema.findOne(params).exec();
    }

    static async create(user, account) {
        let profile = new ProfileSchema({
            first_name: user.first_name,
            last_name: user.last_name,
            account: account._id
        });

        return await profile.save();
    }
}