import React from 'react';
import { connect } from 'react-redux';

import Styles from './topic.less';

@connect(
    ({ Topics }) => ({
        CurTopic: Topics.get('CurTopic')
    }),
    ({ Topics }) => ({
        GetTopic: Topics.GetTopic
    })
)
class Node extends React.Component {
    componentDidMount = async () => {
        this.fetchData();
    };

    fetchData = async () => {
        const { GetTopic, match } = this.props;
        await GetTopic(match.params.id);
    };

    render() {
        const { CurTopic } = this.props;
        const author = CurTopic.author || {};
        return (
            <div className={Styles['page']}>
                <h1>{CurTopic.title}</h1>
                <p>{author.loginname}</p>

                <div dangerouslySetInnerHTML={{ __html: CurTopic.content }} />
            </div>
        );
    }
}

export default Node;
