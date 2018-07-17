import React from 'react';

import Styles from './app.less';

class Node extends React.Component {
    render() {
        return <div className={Styles['test']}>测试例子</div>
    }
}

export default Node;
