import React from 'react';
import {withRouter, Redirect} from "react-router";
import {connect} from 'react-redux';
import {compose} from 'redux';
import {IS_LOGGED, SHOW_LOGIN} from "../../redux/user/types";
import Loading from "../loading/Loading";

export default function withAuthenticate(WrappedComponent) {
    class WithAuthenticate extends React.Component {
        constructor(props) {
            super(props);
            this.state = {is_loading: true};
            store.dispatch({type: IS_LOGGED});
        }

        componentWillReceiveProps(nextProps) {
            if (nextProps.is_authenticated !== this.props.is_authenticated) {
                this.setState({is_authenticated: nextProps.is_authenticated, is_loading: nextProps.is_loading});
            }
        }

        render() {
            if (this.state.is_loading) {
                return <Loading/>;
            }
            if (!this.state.is_authenticated) {
                store.dispatch({type: SHOW_LOGIN});
                return 'Your not logged'
            }
            return (
                <div>
                    {this.state.is_authenticated
                        ? <WrappedComponent {...this.props} />
                        : ''}
                </div>
            )
        }
    }

    const mapStateToProps = (state) => ({
        is_authenticated: state.userReducer.is_authenticated,
        is_loading: false
    });
    return compose(
        withRouter,
        connect(mapStateToProps)
    )(WithAuthenticate);
}