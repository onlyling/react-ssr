/**
 * 客户端需要的 axios 配置
 */
import axios from 'axios';
import { getAjaxHeadersByCookie, setAxios } from './utils';

const Axios = setAxios(axios, getAjaxHeadersByCookie());

export default Axios;
