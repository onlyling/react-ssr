import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import LoadingComponent from './components/page-loading/page-loading';

const Index404 = Loadable({
    loader: () => import('./pages/index-404/index-404'),
    loading: LoadingComponent
});

export const routes = [
    {
        path: '/',
        component: Loadable({
            loader: () => import('./layouts/topics-layout/topics-layout'),
            loading: LoadingComponent
        }),
        routes: [
            {
                path: '/topics/:tab',
                exact: true,
                component: Loadable({
                    loader: () => import('./pages/topics/topics'),
                    loading: LoadingComponent
                })
            },
            {
                path: '/topic/:id',
                exact: true,
                component: Loadable({
                    loader: () => import('./pages/topic/topic'),
                    loading: LoadingComponent
                })
            },
            {
                component: Index404
            }
        ]
    }
];

export default () => {
    return (
        <Switch>
            <Redirect exact from="/" to="/topics/all" />
            {renderRoutes(routes)}
        </Switch>
    );
};
