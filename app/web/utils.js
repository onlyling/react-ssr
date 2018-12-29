/**
 * 接口最基本的接口路径
 */
const BASE_URL = 'https://cnodejs.org/api/v1';

/**
 * 获取 cookie
 * @param {String} c_name
 */
export const getCookie = (c_name) => {
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + '=');
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1;
            let c_end = document.cookie.indexOf(';', c_start);
            if (c_end === -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return '';
};

/**
 * 获取 ajax 的头部 token
 */
export const getAjaxHeadersByCookie = () => {
    return {
        'x-csrf-token': getCookie('csrfToken')
    };
};

/**
 * 设置 axios 的配置
 * @param {Object} axios
 * @param {Object} headers
 */
export const setAxios = (axios, headers = {}) => {
    axios.defaults.headers = headers;

    axios.interceptors.response.use(
        (response) => {
            return Promise.resolve(response.data);
        },
        (error) => {
            return Promise.resolve({
                success: false,
                msg: error
            });
        }
    );

    axios.defaults.baseURL = BASE_URL;

    return axios;
};
