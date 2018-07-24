import React from 'react';
import { connect } from 'react-redux';

@connect(
    () => ({}),
    ({ User }) => ({
        GetCheck: User.GetCheck
    })
)
class Node extends React.Component {
    componentDidMount = () => {
        this.props.GetCheck();
    }

    render() {
        return <div style={{ height: '4000px' }}>index-home</div>;
    }
}

export default Node;
