if (!global._babelPolyfill) {
    require("@babel/polyfill");
}
import path from 'path';
import logger from 'morgan';
import favicon from 'serve-favicon';
import configureStore from "../client/redux/configureStore";
import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {matchRoutes, renderRoutes} from 'react-router-config';
import main_routes from "../routes/index";
import {Provider} from 'react-redux';
import Loadable from 'react-loadable';
import rootSaga from "../client/redux/rootSagas";
import Html from "../commons/Html";
import Helmet from 'react-helmet'
import helmet from 'helmet'
import _ from 'lodash'

const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const config = require('../configs');
let prototype = require('../utils/prototype');
import {I18nextProvider} from 'react-i18next';
import i18n from '../localization';

let assets = require('../../build/assets.json');

if (process.env.NODE_ENV === 'development') {
//SETUP HMR express
    const webpack = require('webpack');
    const webpackConfig = require('../../webpack/webpack.config');
    const compiler = webpack(webpackConfig);
// webpack hmr
    app.use(
        require('webpack-dev-middleware')(compiler, {
            noInfo: true,
            publicPath: webpackConfig.output.publicPath
        })
    );
    app.use(require('webpack-hot-middleware')(compiler, {
        log: console.log,
        path: "/__webpack_hmr",
        heartbeat: 10 * 1000,
    }));
    app.use(express.static(path.resolve(process.cwd(), 'build'), {index: '_'}));
} else {
    app.use(express.static(path.resolve(process.cwd(), 'build'), {index: '_'}));
}
//SETUP seo
app.use(helmet());
app.use(logger('dev', {skip: (req, res) => res.statusCode < 400}));
// app.use(favicon(path.resolve(process.cwd(), 'public/favicon.ico')));

// express will serve up index.html if it doesn't recognize the route
app.get('*', (req, res, next) => {
    // const branch = matchRoutes(main_rArray.from(outes, req.path);
    const store = configureStore();
    global['store'] = store;
    let content = '';
    let context = {};

    store.runSaga(rootSaga).done.then(() => {
        const data = {};
        content = renderToString(
            <I18nextProvider i18n={i18n}>
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        {renderRoutes(main_routes)}
                    </StaticRouter>
                </Provider>
            </I18nextProvider>
        );
        data.helmet = Helmet.renderStatic();
        data.children = content;
        const css = new Set();
        const scripts = new Set();
        for (let key of Object.keys(assets)) {
            let asset = assets[key];
            if (asset['js']) {
                scripts.add(asset['js']);
            }
            if (asset['css']) {
                css.add(asset['css']);
            }
        }

        data.scripts = _.flatten(Array.from(scripts));
        data.styles = _.flatten(Array.from(css));
        data.initial_state = store.getState();
        const html = renderToStaticMarkup(<Html {...data} />);
        res.status(200);
        res.send(`<!doctype html>${html}`);
    });

    console.log('aaaaa');
    content = renderToString(
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    {renderRoutes(main_routes)}
                </StaticRouter>
            </Provider>
        </I18nextProvider>
    );
    if (context.status === 404) {
        res.status(404);
    }
    if (context.status === 302) {
        res.redirect(302, context.url);
    }
    store.close()
});

Loadable.preloadAll().then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
});
