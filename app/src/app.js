/**
 * Created by alex on 03.05.16.
 */

import Koa from 'koa'
import cors from 'koa-cors'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import convert from 'koa-convert'

import db from './../utils/db.connector'
import {errors} from './../utils/errors'
import * as APP_CONFIG from './../config/app.config'

const app = new Koa();

db.connection.on('connected', () => {

    /**
     * Add basic middleware and run server.
     */
    app
        .use(errors)
        .use(convert(cors(APP_CONFIG.CORS)))
        .use(logger())
        .use(convert(bodyParser()))
        .listen(APP_CONFIG.SERVER.port);

    /**
     * Init all routes.
     */
    APP_CONFIG.MODULES.map(mod => app.use(require(`./${mod}/${mod}.routes`).default));
});