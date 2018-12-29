import { Map } from 'immutable';

export default {
    state: Map({
        Classify: [
            {
                value: 'all',
                text: '全部'
            },
            {
                value: 'good',
                text: '精华'
            },
            {
                value: 'share',
                text: '分享'
            },
            {
                value: 'job',
                text: '招聘'
            },
            {
                value: 'dev',
                text: '测试节点'
            }
        ],
        Pager: Map({})
    }),
    reducers: {
        UpdateUserInfo(state, payload) {
            return state.setIn(['UserInfo'], payload);
        }
    },
    effects: {
        // 检查当前用户是否登录
        async GetTopics(params, rootState) {
            let data = await rootState.Axios.get('/topics', {
                limit: 10,
                page: params.page || 1,
                tab: params.tab
            });
        }
    }
};
