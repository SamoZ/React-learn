const apiUrl = 'http://127.0.0.1:7001/default/';

const servicePath = {
    getArticleList: apiUrl + 'getArticleList', // 首页接口
    getArticleById: apiUrl + 'getArticleById/', // 详细页接口
    getTypeInfo: apiUrl + 'getTypeInfo', // 获得文章类接口
    getListById: apiUrl + 'getListById/', // 根据类型 id 获得文章列表
}

export default servicePath;