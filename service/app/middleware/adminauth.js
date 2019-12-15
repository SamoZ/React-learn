'use strict';

module.exports = () => {
  return async function adminauth(ctx, next) {
    console.log(ctx);
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = { data: '未登录' };
    }
  };
};
