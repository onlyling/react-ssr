import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import LoadingComponent from './components/page-loading/page-loading';

const IndexHome = Loadable({
    loader: () => import('./pages/index-home/index-home'),
    loading: LoadingComponent
});

const IndexList = Loadable({
    loader: () => import('./pages/index-list/index-list'),
    loading: LoadingComponent
});

const Index404 = Loadable({
    loader: () => import('./pages/index-404/index-404'),
    loading: LoadingComponent
});


export default () => {
    return (
        <Switch>
            <Route exact path="/home" component={IndexHome} />
            <Route exact path="/list" component={IndexList} />

            <Route component={Index404} />
        </Switch>
    );
};
