import React, {Component} from 'react';
import {ConnectedRouter} from 'react-router-redux';
import {renderRoutes} from "react-router-config";
import main_routes from "../routes/index";
import i18n from "../localization";
import {I18nextProvider} from "react-i18next";

class AppServer extends Component {
    render() {
        return (
            <I18nextProvider i18n={i18n}>
                {renderRoutes(main_routes)}
            </I18nextProvider>
        )
    }
}

export default AppServer;
