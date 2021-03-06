/**
 * Created by alex on 03.05.16.
 */

import Router from 'koa-router'

import LoginController from './login.controller'

const OPTIONS = {
    prefix: '/login'
};

const router = new Router(OPTIONS);

router
    .post('/', async(ctx, next) => {
        ctx.body = await LoginController.login(ctx.request.body);
        await next();
    });

export default router.routes();