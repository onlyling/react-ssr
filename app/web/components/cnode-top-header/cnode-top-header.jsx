import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './cnode-top-header.module.less';

export default (props) => {
    const Navs = props.navs.map((n) => {
        return (
            <li key={n.value} className={Styles['nav']}>
                <Link to={`/topics/${n.value}`}>{n.text}</Link>
            </li>
        );
    });

    return (
        <div className={Styles['header-box']}>
            <ul className="ui-content">
                {Navs}
            </ul>
        </div>
    );
};
