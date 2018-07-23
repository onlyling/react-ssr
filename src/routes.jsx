import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import LoadingComponent from './components/page-loading/page-loading';
import AdminLayout from './layouts/admin-layout/admin-layout';

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

const AdminHome = Loadable({
    loader: () => import('./pages/admin-home/admin-home'),
    loading: LoadingComponent
});

export default () => {
    return (
        <Switch>
            <Route exact path="/home" component={IndexHome} />
            <Route exact path="/list/index" component={IndexList} />

            <Redirect exact from="/" to="/home" />

            {/* <Route path="/admin" component={AdminLayout} /> */}

            <Route
                path="/"
                render={() => {
                    return <AdminLayout>
                        <Route path="/admin/home" component={AdminHome} />
                    </AdminLayout>;
                }}
            />

            <Route component={Index404} />
        </Switch>
    );
};
