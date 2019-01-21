/**
 * 客户端需要的 axios 配置
 */
import axios from 'axios';
import { BASE_URL } from './utils';

export default (headers) => {
    axios.defaults.headers = headers || {};
    axios.defaults.baseURL = `http://localhost:3000${BASE_URL}`;

    axios.interceptors.response.use(
        (response) => {
            console.log('-- response --');
            console.log(JSON.stringify(response.data));
            console.log('-- response --');
            if (response && response.data) {
                return Promise.resolve(response.data);
            } else {
                return Promise.reject('response 不存在');
            }
        },
        (error) => {
            console.log('-- error --');
            console.log(error);
            console.log('-- error --');
            return Promise.reject({
                success: false,
                msg: error
            });
        }
    );

    return axios;
};
