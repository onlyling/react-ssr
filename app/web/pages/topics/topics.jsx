import React from 'react';
import { connect } from 'react-redux';

import TopicsNav from '@components/topics-nav/topics-nav';
import TopicsLayout from '@layouts/topics-layout/topics-layout';

import Styles from './topics.less';

@connect(
    ({ Topics }) => ({
        Classify: Topics.get('Classify')
    }),
    () => ({})
)
class Node extends React.Component {
    componentDidMount = () => {
        // this.props.GetCheck();
    };

    render() {
        return (
            <TopicsLayout className={Styles['page']}>
                <TopicsNav navs={this.props.Classify} />

                fdsfsdfsdfs
            </TopicsLayout>
        );
    }
}

export default Node;
