import React from 'react';
import { connect } from 'react-redux';

import TopicsNav from '@components/topics-nav/topics-nav';
import TopicsLayout from '@layouts/topics-layout/topics-layout';
import TopicsList from '@components/topics-list/topics-list';
import BaseList from '@components/base-list/base-list';

import Styles from './topics.less';

@connect(
    ({ Topics }) => ({
        Classify: Topics.get('Classify'),
        ClassifyMap: Topics.get('ClassifyMap'),
        Pager: Topics.get('Pager'),
        isFetching: Topics.get('isFetching')
    }),
    ({ Topics }) => ({
        GetTopics: Topics.GetTopics
    })
)
class Node extends BaseList {
    constructor(props) {
        super(props);
        this.state = {
            tab: ''
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            tab: nextProps.match.params.tab
        };
    }

    $initPage = () => {
        const { GetTopics } = this.props;
        GetTopics({
            tab: this.state.tab,
            page: 1
        });
        console.log(this.state);
    };

    componentDidMount = () => {
        console.log('----');
        this.$initPage();
    };

    render() {
        const self = this;
        const { Pager, isFetching, ClassifyMap, Classify } = self.props;
        const { tab } = self.state;
        return (
            <TopicsLayout className={Styles['page']}>
                <TopicsNav navs={Classify} />
                <TopicsList list={Pager.get(tab)} loading={isFetching} ClassifyMap={ClassifyMap} />
            </TopicsLayout>
        );
    }
}

export default Node;
