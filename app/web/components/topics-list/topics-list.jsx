import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './topics-list.less';

/**
 * 获取最后回复的时间
 * @param {*} t
 */
const getLastReplyTime = (t) => {
    const now = Math.floor(+new Date() / 1000);
    const old = Math.floor(+new Date(t) / 1000);
    const dif = now - old;
    let text = '';
    let level = 0;

    while (text === '') {
        let d = 0;
        switch (level) {
            case 0:
                d = Math.floor(dif / 24 / 60 / 60);
                if (d > 0) {
                    text = `${d}天前`;
                }
                break;
            case 1:
                d = Math.floor(dif / 60 / 60);
                if (d > 0) {
                    text = `${d}小时前`;
                }
                break;
            case 2:
                d = Math.floor(dif / 60);
                if (d > 0) {
                    text = `${d}分钟前`;
                }
                break;
            case 3:
                d = Math.floor(dif / 60);
                if (d > 10) {
                    text = `${d}秒前`;
                } else {
                    text = `几秒前`;
                }
                break;

            default:
                break;
        }
        level++;
    }

    return text;
};

export default (props) => {
    const ClassifyMap = props.ClassifyMap || {};
    const list = props.list || [];

    return (
        <div className={Styles['topics']}>
            {props.loading ? (
                <p className={Styles['loading']}>加载中...</p>
            ) : list.length > 0 ? (
                list.map((item) => {
                    const author = item.author || {};
                    return (
                        <div key={item.id} className={Styles['topic']}>
                            <div className={Styles['avatar']}>
                                <img alt={author.loginname} src={author.avatar_url} />
                            </div>
                            <div className={Styles['reply']}>
                                <span className={Styles['count']}>{item.reply_count}</span>
                                <span className={Styles['split']}>/</span>
                                <span className={Styles['visit']}>{item.visit_count}</span>
                            </div>
                            <div className={Styles['time']}>{getLastReplyTime(item.last_reply_at)}</div>
                            <div className={Styles['title']}>
                                {item.top ? (
                                    <span className={Styles['top']}>置顶</span>
                                ) : (
                                    <span className={Styles['icon']}>{ClassifyMap[item.tab]}</span>
                                )}
                                <Link className={Styles['link']} to={`/topic/${item.id}`}>
                                    {item.title}
                                </Link>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p className={Styles['loading']}>暂无数据</p>
            )}
        </div>
    );
};
