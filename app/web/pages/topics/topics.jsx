import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import BaseList from '@components/base-list/base-list';
import TopicsNav from '@components/topics-nav/topics-nav';
import TopicsList from '@components/topics-list/topics-list';
import Paging from '@components/paging/paging';

// import Styles from './topics.less';

@connect(
    ({ Topics }) => ({
        Classify: Topics.Classify,
        ClassifyMap: Topics.ClassifyMap,
        Pager: Topics.Pager,
        isFetching: Topics.isFetching
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

        this.$initQueryData();
    }

    componentDidMount = async () => {
        await this.$initPage();
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            tab: nextProps.match.params.tab
        };
    }

    fetchData = async () => {
        const self = this;
        const { GetTopics } = self.props;
        await GetTopics({
            tab: this.state.tab,
            page: +(self.$getQueryData('page') || 1)
        });
    };

    $initPage = () => {
        this.fetchData();
    };

    render() {
        const self = this;
        const { Pager, isFetching, ClassifyMap, Classify } = self.props;
        const { tab } = self.state;
        const PagerData = self.$getPager();

        return (
            <Fragment>
                <TopicsNav navs={Classify} />
                <TopicsList list={Pager[tab]} loading={isFetching} ClassifyMap={ClassifyMap} />
                <Paging {...PagerData} />
            </Fragment>
        );
    }
}

export default Node;
