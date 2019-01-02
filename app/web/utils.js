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

/**
 * 获取分页配置
 * @param {Object} param0
 * @param {Function} onChange
 */
export const getPager = ({ pageNo = 1, pageSize = 10, totalRecords = 0, totalPage = 0 }, onChange) => {
    return {
        size: 'small',
        showSize: true,
        showQuickJumper: true,
        current: pageNo,
        pageSize,
        total: totalRecords,
        showTotal: (total, range) => {
            return `第${pageNo}/${totalPage}页 每页 ${pageSize} 项 共 ${total} 项`;
        },
        onChange
    };
};

/**
 * 键值对转对象
 * @param {String} str
 * @param {String} key
 */
export const getParam = (str, key) => {
    var __o = {};
    var __strArr = str.split('&');
    var __cValue = '';

    for (var i = __strArr.length - 1; i >= 0; i--) {
        var __d = __strArr[i].split('=');
        var __k = decodeURIComponent(__d[0]);
        var __v = decodeURIComponent(__d[1]);
        __cValue = __o[__k];
        if (__cValue) {
            if (typeof __cValue === 'string') {
                __o[__k] = [__cValue, __v];
            } else {
                __o[__k].push(__v);
            }
        } else {
            __o[__k] = __v;
        }
    }
    return key ? __o[key] : __o;
};

/**
 * 键值对转对象 search
 * @param {*} str
 * @param {*} key
 */
export const getParamBySearchString = (str, key) => {
    if (str) {
        str = str.substr(1);
        return getParam(str, key);
    } else {
        return {};
    }
};

/**
 * 对象格式转成字符串
 * @param {Object} obj
 */
export const parseObject2search = (obj) => {
    let __s = [];
    let __ss = '';

    Object.keys(obj).forEach((key) => {
        let __value = obj[key];
        let __v = '';
        if (Array.isArray(__value)) {
            __value.forEach((str) => {
                if (str) {
                    __s.push(`${key}=${encodeURIComponent(str)}`);
                }
            });
        } else {
            __v = __value;
            __s.push(`${key}=${encodeURIComponent(__v)}`);
        }
    });

    if (__s.length) {
        __ss = `?${__s.join('&')}`;
    }

    return __ss;
};
