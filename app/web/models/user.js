export default {
    state: {
        UserInfo: {}
    },
    reducers: {
        UpdateUserInfo(state, payload) {
            return Object.assign({}, state, {
                UserInfo: payload
            });
        }
    },
    effects: {
        // 检查当前用户是否登录
        async GetCheck(params, rootState) {
            let data = await rootState.Axios.get('/login/check');
            if (data.success) {
                this.UpdateUserInfo(rootState.User.get('UserInfo'));
            } else {
                this.UpdateUserInfo({});
            }
        },
        // 用户登录
        async PostLogin(params, rootState) {
            let data = await rootState.Axios.post('/login', params);
            if (data.success) {
                this.UpdateUserInfo(data.data);
            }
            return data;
        }
    }
};
