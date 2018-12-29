import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './topics-list.less';

export default (props) => {
    const List = props.list.map((article) => {
        return (
            <div key={article.id}>
                <div>touxiang</div>
                <div>统计</div>
                <div>时间</div>
                <div>标题</div>
            </div>
        );
    });

    return <div className={Style['topics']}>{List}</div>;
};
