import React from 'react';
// import { connect } from 'react-redux';

import Styles from './index-home.less';

// @connect(
//     () => ({}),
//     ({ User }) => ({
//         GetCheck: User.GetCheck
//     })
// )
class Node extends React.Component {
    componentDidMount = () => {
        // this.props.GetCheck();
    }

    render() {
        return <div className={Styles['page']}>index-home</div>;
    }
}

export default Node;
