import React from 'react';
import Home from "../client/pages/home/index.js";
import About from "../client/pages/about/index.js";
import RootRouter from "../client/containers/RootRouter";
import NotFound from "../commons/NotFound";
import {STORAGE_KEY} from "../consts/Storage";
import {Redirect} from 'react-router-dom';
import withAuthenticate from "../client/components/hoc/WithAuthenticate";
import TourDetail from "../client/pages/tour_detail/TourDetail";

const main_routes = [
    {
        component: RootRouter,
        routes: [
            {
                path: '/',
                exact: true,
                component: Home
            },
            {
                path: '/tour/:detail_uri',
                component: TourDetail
            },
            {
                path: '/home',
                exact: true,
                component: withAuthenticate(Home)
            },
            {
                path: '/about',
                exact: true,
                component: About
            },
            {
                path: '*',
                component: NotFound
            }

        ]
    }
];

export default main_routes;