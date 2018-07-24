import { Map } from 'immutable';
import { Axios } from '../utils';

export default {
    state: Map({
        UserInfo: Map({})
    }),
    reducers: {
        UpdateUserInfo(state, payload) {
            return state.setIn(['UserInfo'], payload);
        }
    },
    effects: {
        // 检查当前用户是否登录
        async GetCheck(params, rootState) {
            let data = await Axios.get('/login/check');
            if (data.success) {
                this.UpdateUserInfo(rootState.User.get('UserInfo'));
            } else {
                this.UpdateUserInfo(Map({}));
            }
        },
        // 用户登录
        async PostLogin(params, rootState) {
            let data = await Axios.post('/login', params);
            if (data.success) {
                this.UpdateUserInfo(Map(data.data));
            }
            return data;
        }
    }
};
