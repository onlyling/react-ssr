import React from 'react';
import { NavLink } from 'react-router-dom';
import Styles from './topics-nav.module.less';

export default (props) => {
    const Navs = props.navs.map((n) => {
        return (
            <NavLink key={n.value} className={Styles['nav']} activeClassName={Styles['active']} to={`/topics/${n.value}`}>{n.text}</NavLink>
        );
    });

    return (
        <div className={Styles['navs']}>{Navs}</div>
    );
};
