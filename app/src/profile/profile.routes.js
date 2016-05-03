/**
 * Created by alex on 03.05.16.
 */
import Router from 'koa-router'

const OPTIONS = {
    prefix: '/user'
};

const router = new Router(OPTIONS);

router.post('/', async(ctx, next) => {
    console.log('POST PROFILE');
});

export default router.routes();