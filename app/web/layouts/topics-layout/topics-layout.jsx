import React from 'react';
import Styles from './topics-layout.less';

// import { Layout, Menu, Icon } from 'antd';

export default (props) => {
    return (
        <div className="ui-content">
            <div className={Styles['topics']}>
                <div className={Styles['content']}>{props.children}</div>
                <div className={Styles['expand']}>AD</div>
            </div>
        </div>
    );
};
