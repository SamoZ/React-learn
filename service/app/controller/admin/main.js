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

  async getArticleList() {
    const { ctx } = this;
    const sql = 'SELECT article.id as id ,' +
      'article.title as title ,' +
      'article.introduce as introduce ,' +
      "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime ," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'ORDER BY article.id DESC';
    const result = await this.app.mysql.query(sql);
    ctx.body = { list: result };
  }

  async delArticle() {
    const { ctx } = this;
    const id = ctx.params.id;
    const result = await this.app.mysql.delete('article', { id });
    ctx.body = { data: result };
  }

  async getArticleById() {
    const { ctx } = this;
    const id = ctx.params.id;
    const sql = 'SELECT article.id as id ,' +
      'article.title as title ,' +
      'article.introduce as introduce ,' +
      'article.article_content as article_content ,' +
      "FROM_UNIXTIME(article.addTime, '%Y-%m-%d') as addTime ," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.id=' + id;
    const result = await this.app.mysql.query(sql);
    ctx.body = { data: result };
  }
}

module.exports = MainController;
