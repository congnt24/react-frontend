import React, {Component} from 'react';
import {renderRoutes} from "react-router-config";
import NavHeader from "../components/header/NavHeader";
import Footer from "../components/footer/Footer";
class RootRouter extends Component {
    render() {
        return (
            <React.Fragment>
                <NavHeader/>
                {renderRoutes(this.props.route.routes)}
                <Footer/>
            </React.Fragment>
        );
    }
}

export default RootRouter;
