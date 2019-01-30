import React from 'react';
import { renderRoutes } from 'react-router-config';

import Styles from './topics-layout.module.less';

// import { Layout, Menu, Icon } from 'antd';

export default (props) => {
    return (
        <div className="ui-content">
            <div className={Styles['topics']}>
                <div className={Styles['content']}>{renderRoutes(props.route.routes)}</div>
                <div className={Styles['expand']}>AD</div>
            </div>
        </div>
    );
};
