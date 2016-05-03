/**
 * Created by alex on 03.05.16.
 */
import connection from './../../utils/db.connector'

let Schema = connection.Schema;

let Profile = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    account: {type: Schema.Types.ObjectId, ref: 'Account'}
});

export default connection.model('Profile', Profile);