import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import LoadingComponent from './components/page-loading/page-loading';
// import AdminLayout from './layouts/admin-layout/admin-layout';

const TopicsHome = Loadable({
    loader: () => import('./pages/topics/topics'),
    loading: LoadingComponent
});

const Index404 = Loadable({
    loader: () => import('./pages/index-404/index-404'),
    loading: LoadingComponent
});

export default () => {
    return (
        <Switch>
            <Route exact path="/topics/:tab" component={TopicsHome} />
            <Redirect exact from="/" to="/topics/all" />

            {/* <Route
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
            /> */}

            <Route component={Index404} />
        </Switch>
    );
};
