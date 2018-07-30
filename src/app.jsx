import React from 'react';
import { Link } from 'react-router-dom';

import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import Routes from './routes';

class Node extends React.Component {
    render() {
        return (
            <ScrollToTop>
                <Link to="/home">home</Link>
                &emsp;
                <Link to="/list/index">list</Link>
                &emsp;
                <Link to="/error">404</Link>
                &emsp;
                <Link to="/admin/home">admin-home</Link>
                <Routes />
            </ScrollToTop>
        );
    }
}

export default Node;
