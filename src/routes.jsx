import React from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
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

const IndexLogin = Loadable({
    loader: () => import('./pages/index-login/index-login'),
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

const AdminList= Loadable({
    loader: () => import('./pages/admin-list/admin-list'),
    loading: LoadingComponent
});

export default () => {
    return (
        <Switch>
            <Route exact path="/home" component={IndexHome} />
            <Route exact path="/list/index" component={IndexList} />

            <Route exact path="/login" component={IndexLogin} />

            <Redirect exact from="/" to="/home" />

            {/* <Route path="/admin" component={AdminLayout} /> */}

            <Route
                path="/admin"
                render={() => {
                    return <AdminLayout>
                        <div>
                            <Link to="/admin/home">admin-home</Link>
                            &emsp;
                            <Link to="/admin/list">admin-list</Link>
                        </div>
                        <Route path="/admin/home" component={AdminHome} />
                        <Route path="/admin/list" component={AdminList} />
                    </AdminLayout>;
                }}
            />

            <Route component={Index404} />
        </Switch>
    );
};
