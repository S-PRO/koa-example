/**
 * Created by alex on 03.05.16.
 */

import mongoose from 'mongoose'

const CONFIG = {
    port: 27017,
    host: 'localhost',
    name: 'koala'
};

const onDbConnected = () => console.log('mongodb connection open');
const onDbDisconnected = () => console.log('mongodb disconnected');
const onDbError = error => {
    throw(error);
};

mongoose.connect(`mongodb://${CONFIG.host}:${CONFIG.port}/${CONFIG.name}`);

mongoose.connection.on('error', onDbError);
mongoose.connection.on('connected', onDbConnected);
mongoose.connection.on('disconnected', onDbDisconnected);

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        process.exit(
            0,
            console.log('mongodb connection disconnected through app termination.')
        );
    });
});

export default mongoose;