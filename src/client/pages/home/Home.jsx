import React, {Component} from 'react';
import Layout from "../../layouts/Layout";
import {Link} from 'react-router-dom'
import {renderRoutes} from "react-router-config";
import {fetchBannerAction} from "./duck/actions";
import BannerHomeContainer from './containers/BannerHomeContainer'
import Helmet from 'react-helmet';
import {Button, Segment, Image, Divider} from 'semantic-ui-react'
import MainTableContainer from './containers/MainTableContainer';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout test_prop="Home">
                <Helmet title="Home"/>
                <Segment>
                    <div style={{
                        margin: 'auto',
                        width: '100%',
                        display: "block"
                    }}>
                        <BannerHomeContainer/>
                    </div>
                    <br/>
                    <Divider/>
                <MainTableContainer/>
                </Segment>
                {/*{renderRoutes(this.props.route.routes)}*/}
            </Layout>
        );
    }
}

export default Home
