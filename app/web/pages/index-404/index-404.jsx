import React from 'react';
// import { connect } from 'react-redux';

import Styles from './index-404.less';

// @connect(
//     (state) => ({}),
//     (dispatch) => ({})
// )
class Node extends React.Component {
    render() {
        return <div className={Styles['page']}>index-404</div>;
    }
}

export default Node;
