const CLASSIFY_MAP = {
    all: '全部',
    good: '精华',
    share: '分享',
    ask: '问答',
    job: '招聘',
    dev: '测试节点'
};

export default {
    state: {
        Classify: Object.keys(CLASSIFY_MAP).map((key) => {
            return {
                text: CLASSIFY_MAP[key],
                value: key
            };
        }),
        ClassifyMap: CLASSIFY_MAP,
        Pager: {},
        isFetching: false,
        CurTopic: {}
    },
    reducers: {
        UpdateFetching(state, payload) {
            return Object.assign({}, state, {
                isFetching: payload
            });
        },
        UpdateTopicsPager(state, { tab = 'all', list = [] }) {
            return Object.assign({}, state, {
                Pager: {
                    ...state.Pager,
                    [tab]: list
                }
            });
        },
        UpdateCurTopic(state, payload) {
            return Object.assign({}, state, {
                CurTopic: payload
            });
        }
    },
    effects: {
        // 检查当前用户是否登录
        async GetTopics(params, rootState) {
            const self = this;
            const tab = params.tab;

            self.UpdateFetching(true);
            self.UpdateTopicsPager({
                tab: tab
            });

            let data = await rootState.Axios.get('/topics', {
                params: {
                    limit: 2,
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
            let data = await rootState.Axios.get(`/topic/${topicId}`);
            if (data.success) {
                this.UpdateCurTopic(data.data);
            }
        }
    }
};
