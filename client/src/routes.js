import React from 'react';
import Dashboard from './screens/dashboard/Dashboard';
import Login from './screens/login/Login';
import PageNotFound from './screens/pageNotFound/PageNotFound';

const routes = [
    { path: '/', title: 'TDCX Login', component: <Login/>, isPublic: true },
    { path: '/dashboard', title: 'Dashboard', component: <Dashboard/>, isPublic: false },
    { path: '*', title: 'Page Not Found', component: <PageNotFound/>, isPublic: true }
]

export default routes;