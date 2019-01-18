import { Map } from 'immutable';

const CLASSIFY_MAP = {
    all: '全部',
    good: '精华',
    share: '分享',
    ask: '问答',
    job: '招聘',
    dev: '测试节点'
};

export default {
    state: Map({
        Classify: Object.keys(CLASSIFY_MAP).map((key) => {
            return {
                text: CLASSIFY_MAP[key],
                value: key
            };
        }),
        ClassifyMap: CLASSIFY_MAP,
        Pager: Map({}),
        isFetching: false,
        CurTopic: {}
    }),
    reducers: {
        UpdateUserInfo(state, payload) {
            return state.setIn(['UserInfo'], payload);
        },
        UpdateFetching(state, payload) {
            return state.setIn(['isFetching'], payload);
        },
        UpdateTopicsPager(state, { tab = 'all', list = [] }) {
            return state.setIn(['Pager', tab], list);
        },
        UpdateCurTopic(state, payload) {
            return state.setIn(['CurTopic'], payload);
        }
    },
    effects: {
        // 检查当前用户是否登录
        async GetTopics(params, rootState) {
            const self = this;
            const tab = params.tab;
            self.UpdateTopicsPager({
                tab: tab,
                list: []
            });

            self.UpdateFetching(true);
            let data = await rootState.Axios.get('/topics', {
                params: {
                    limit: 20,
                    page: params.page || 1,
                    tab: tab
                }
            });
            if (data.success) {
                self.UpdateTopicsPager({
                    tab: tab,
                    list: data.data
                });
            }
            self.UpdateFetching(false);
        },
        async GetTopic(topicId, rootState) {
            this.UpdateCurTopic({});

            let data = await rootState.Axios.get(`/topic/${topicId}`);
            if (data.success) {
                this.UpdateCurTopic(data.data);
            }
        }
    }
};
