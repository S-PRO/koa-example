/**
 * Created by alex on 03.05.16.
 */

import mongoose from './../../utils/db.connector'

let Schema = mongoose.Schema;

let Account = Schema({
    password: String,
    email: {type: String, required: true, unique: true, lowercase: true, trim: true}
});

export default mongoose.model('Account', Account);