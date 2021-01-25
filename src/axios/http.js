import axios from 'axios';
/**
 * @param {'get' | 'post'} method
 * @param { string } url
 * @param { any } data
 * @param errMsg
 */
function ajax(method, url, params) {
    return new Promise((reslove, reject) => {
        let ajaxParams = {};
        let ajaxMethod = {};
        if (method === 'get') {
            ajaxMethod = axios[method];
            ajaxParams = {
                params
            };
        } else if (method === 'post') {
            let formData = new FormData();
            for (let key in params) {
                formData.append(key, params[key]);
            }
            ajaxMethod = axios[method];
            ajaxParams = formData;
        } else {
            reject('不支持此请求');
            return;
        }
        ajaxMethod(url, ajaxParams).then((res) => {
            const body = res.data;
            reslove(body);
        }, (reason) => {
            // 从服务器没有获取数据（网络层失败）
            let response = null;
            if (reason) {
                // 起码服务器有响应，只不过状态码是4/5开头的
                response = reason.response;
                switch (response.status) {
                    case 401:
                        // 一般情况下都是未登录
                        break;
                    case 403:
                        // 一般情况下是TOKEN过期
                        break;
                    case 404:
                        // 地址不存在
                        break;
                };
            } else {
                // window.navigator.onLine   ==> true有网，false断网
                if (!window.navigator.onLine) {
                    alert('和抱歉，网络连接已经断开，请联网后再试~~');
                }
            }
            reject(reason);
        });
    });
}
const get = (url, params, errMsg) => {
    return ajax('get', url, params, errMsg);
};

const post = (url, data, errMsg) => {
    return ajax('post', url, data, errMsg);
};
const http = {
    get: get,
    post: post
};
export default http;