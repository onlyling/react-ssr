import axios from 'axios';

/**
 * 接口最基本的接口路径
 */
const BASE_URL = '/api';

axios.interceptors.response.use(
    (response) => {
        return Promise.resolve(response.data);
        // if (response.status === 200) {
        //     let data = response.data
        //     if (data.code === 200) {
        //         return Promise.resolve(data)
        //     } else {
        //         return Promise.reject(data.message)
        //     }
        // } else {
        //     console.log(response)
        //     return Promise.reject('网络出错')
        // }
    },
    (error) => {
        return Promise.resolve({
            success: false,
            msg: error
        });
    }
);
axios.defaults.baseURL = BASE_URL;

export const Axios = axios;
