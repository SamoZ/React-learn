const apiUrl = 'http://127.0.0.1:7001/admin/';

const servicePath = {
    checkLogin: apiUrl + 'checkLogin', // 登录
    getTypeInfo: apiUrl + 'getTypeInfo', // 获取文章类型
    addArticle: apiUrl + 'addArticle', // 添加文章
    updateArticle: apiUrl + 'updateArticle', // 更新文章
    getArticleList: apiUrl + 'getArticleList', // 获取文章列表
    delArticle: apiUrl + 'delArticle/', // 删除文章
    getArticleById: apiUrl + 'getArticleById/', // 根据 id 获取文章内容
}

export default servicePath;