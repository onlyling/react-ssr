import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './paging.less';

export default (props) => {
    return (
        <div className={Styles['paging']}>
            {props.prevUrl ? (
                <button type="button" className={Styles['btn']}>
                    <Link to={props.prevUrl}>上一页</Link>
                </button>
            ) : (
                ''
            )}

            {props.nextUrl ? (
                <button type="button" className={Styles['btn']}>
                    <Link to={props.nextUrl}>下一页</Link>
                </button>
            ) : (
                ''
            )}
        </div>
    );
};
