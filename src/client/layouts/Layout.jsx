import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                {/*<div><p>breadcrumb {this.props.test_prop}: </p></div>*/}
                {this.props.children}
            </React.Fragment>
        );
    }
}

export default connect(state => state)(Layout);

Layout.propTypes = {
    test_prop: PropTypes.string
}