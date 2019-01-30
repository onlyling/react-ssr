/**
 * 客户端需要的 axios 配置
 */
import axios from 'axios';
import { BASE_URL } from './utils';

export default (headers) => {
    const instance = axios.create({
        baseURL: `http://localhost:3000${BASE_URL}`,
        headers
    });

    instance.interceptors.request.use((config) => ({
        ...config,
        data: {
            // 此处注意，你的`data`应该是个对象，不能是其他数据类型
            ...(config.data || {}),
            _: +new Date()
        }
    }));

    instance.interceptors.response.use(
        (response) => {
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

    return instance;
};
