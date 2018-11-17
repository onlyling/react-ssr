/**
 * 客户端需要的 axios 配置
 */
import axios from 'axios';
import { setAxios } from './utils';

export default (header) => {
    return setAxios(axios, header);
};
