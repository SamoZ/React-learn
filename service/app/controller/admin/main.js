'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'api';
  }

  async checkLogin() {
    const { ctx } = this;
    const userName = ctx.request.body.userName;
    const password = ctx.request.body.password;
    const sql =
			"SELECT userName FROM admin_user WHERE userName = '" +
			userName +
			"'AND password = '" +
			password +
			"'";
    const results = await this.app.mysql.query(sql);
    if (results.length > 0) {
      const openId = new Date().getTime();
      ctx.session.openId = { opendId: openId };
      ctx.body = { data: '登录成功', opendId: openId };
    } else {
      ctx.body = { data: '登录失败' };
    }
  }

  async getTypeInfo() {
    const { ctx } = this;
    const results = await this.app.mysql.select('type');
    ctx.body = { data: results };
  }

  async addArticle() {
    const { ctx } = this;
    const tempArticle = ctx.request.body;
    const results = await this.app.mysql.insert('article', tempArticle);
    const insertSuccess = results.affectedRows === 1;
    const insertId = results.insertId;
    ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }

  // 更新文章
  async updateArticle() {
    const { ctx } = this;
    const tempArticle = ctx.request.body;
    const results = await this.app.mysql.update('article', tempArticle);
    const updateSuccess = results.affectedRows === 1;
    ctx.body = {
      isSuccess: updateSuccess,
    };
  }
}

module.exports = MainController;
