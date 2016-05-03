/**
 * Created by alex on 03.05.16.
 */

export const errors = async(ctx, next) => {
    try {
        await next();
    } catch (e) {
        console.log('CATCH ERROR -->> ', e);
        let payload = e;
        if (e.isBoom) payload = e.output.payload;
        ctx.status = payload.statusCode || payload.status || 500;
        ctx.body = payload;
    }
};