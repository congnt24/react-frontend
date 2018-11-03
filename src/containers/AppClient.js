import React, {Component} from 'react';
import {ConnectedRouter} from 'react-router-redux';
import {renderRoutes} from "react-router-config";
import history from "../commons/history";
import main_routes from "../routes/index";
import {Provider} from 'react-redux';
import i18n from "../localization";
import {I18nextProvider} from "react-i18next";
import rootSaga from "../client/redux/rootSagas";
import configureStore from '../client/redux/configureStore';

let store = configureStore(window.__REDUX_INITIAL_STATE__ || {});
store.runSaga(rootSaga);
global['store'] = store;

class AppClient extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <I18nextProvider i18n={i18n}>
                        {renderRoutes(main_routes)}
                    </I18nextProvider>
                </ConnectedRouter>
            </Provider>
        )
    }
}

export default AppClient;
