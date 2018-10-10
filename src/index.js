import webpack from 'webpack';
import webpack_client from '../webpack/webpack.config';
import webpack_server from '../webpack/webpack.server.config';
import {exec, spawn} from 'child_process';
webpack(webpack_client).run((err, stats) => {
    console.info(stats.toString(webpack_client.stats));
    if (stats.hasErrors()) {
        throw new Error('Webpack compilation errors');
    }
    webpack(webpack_server).run((err, stats) => {
        console.info(stats.toString(webpack_client.stats));
        if (stats.hasErrors()) {
            throw new Error('Webpack compilation errors');
        }

    });
});