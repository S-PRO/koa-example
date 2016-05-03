/**
 * Created by alex on 03.05.16.
 */
import Router from 'koa-router'
import AccountController from './account.controller'

const OPTIONS = {
    prefix: '/account'
};

const router = new Router(OPTIONS);


router
    .post('/', async(ctx, next) => {
        await AccountController.register(ctx);
        await next();
    });

export default router.routes();