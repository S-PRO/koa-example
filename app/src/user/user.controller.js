export default class LoginController {

  static async create(ctx, next) {
    ctx.body = { foo: 'bar' };
    await next();
  }

}
