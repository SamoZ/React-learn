const apiUrl = 'http://127.0.0.1:7001/admin/';

const servicePath = {
    checkLogin: apiUrl + 'checkLogin', // 登录
    getTypeInfo: apiUrl + 'getTypeInfo', // 获取文章类型
    addArticle: apiUrl + 'addArticle', // 添加文章
    updateArticle: apiUrl + 'updateArticle', // 更新文章
}

export default servicePath;