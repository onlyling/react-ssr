import React from 'react';
// import { connect } from 'react-redux';

import Styles from './index-list.less';

// @connect(
//     (state) => ({}),
//     (dispatch) => ({})
// )
class Node extends React.Component {
    render() {
        return (
            <div className={Styles['page']}>
                <div>index-list</div>
                <div className={Styles['s']}>s</div>
            </div>
        );
    }
}

export default Node;
