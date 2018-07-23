import { Map } from 'immutable';
import { Axios } from '../utils';

export default {
    state: Map({
        UserInfo: Map({})
    }),
    reducers: {
        UpdateUserInfo(state, payload) {
            return state.setIn(['Data'], payload);
        }
    },
    effects: {
        async GetCheck(params, rootState) {
            let data = await Axios.get('/login/check');
            if (data.success) {
                this.UpdateUserInfo(rootState.User.get('Data'));
            } else {
                this.UpdateUserInfo(Map({}));
            }
        }
    }
};
