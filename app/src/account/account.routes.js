/**
 * Created by alex on 03.05.16.
 */
import Router from 'koa-router'
import TokenService from './../../utils/token'

const OPTIONS = {
    prefix: '/account'
};

const router = new Router(OPTIONS);


router
    .use(TokenService.tokenRequired)
    .post('/', async(ctx, next) => {
        await next();
    });

export default router.routes();