/**
 * Created by congnt on 11/5/18.
 */
"use strict";
import React, {Component} from 'react';
import {Responsive as SemanticResponsive, ResponsiveWidthShorthand} from 'semantic-ui-react';
import {connect} from "react-redux";

class Responsive extends Component {
    static onlyMobile = {
        minWidth: 320,
        maxWidth: 767
    };
    static onlyTablet = {
        minWidth: 768,
        maxWidth: 991
    };
    static onlyComputer = {
        minWidth: 992
    };
    static onlyLargeScreen = {
        minWidth: 1200,
        maxWidth: 1919
    };
    static onlyWidescreen = {
        minWidth: 1920
    };
    getWidth = () => {
        if (this.props.phone) {
            return Responsive.onlyMobile.minWidth;
        }
        if (this.props.tablet) {
            return Responsive.onlyTablet.minWidth;
        }
        if (this.props.mobile) {
            return Responsive.onlyMobile.minWidth;
        }
        if (this.props.desktop) {
            return Responsive.onlyComputer.minWidth;
        }
        return 0;

    };

    render() {
        return (
            <SemanticResponsive {...this.props}
                                getWidth={() => (typeof window !== 'undefined' ? window.innerWidth : this.getWidth())}>
                {this.props.children}
            </SemanticResponsive>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        phone: state.responsive.phone ? 1 : 0,
        desktop: state.responsive.desktop ? 1 : 0,
        tablet: state.responsive.tablet ? 1 : 0,
        mobile: state.responsive.mobile ? 1 : 0,
    }
};
export default connect(mapStateToProps, () => ({}))(Responsive);