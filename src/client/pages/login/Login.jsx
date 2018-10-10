import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import LoginForm from "../../components/form/LoginForm";
import SignUpForm from "../../components/form/SignUpForm";
import {connect} from 'react-redux'
import {CLOSE_LOGIN_MODAL, SHOW_LOGIN, SHOW_SIGNUP} from "../../redux/user/types";

class Login extends Component {
    constructor(props) {
        super(props);
    }

    onSwitchToSignIn = () => {
        store.dispatch({type: SHOW_LOGIN});
    };
    onSwitchToSignUp = () => {
        store.dispatch({type: SHOW_SIGNUP});
    };

    render() {
        return (
            <Modal open={['login', 'sign_up'].includes(this.props.show_modal)} size='tiny' closeIcon
                   onClose={(e, {size}) => {
                       store.dispatch({type: CLOSE_LOGIN_MODAL});
                   }}>
                <Modal.Header>{this.props.show_modal === 'login' ? 'Login' : 'Sign Up'}</Modal.Header>
                <Modal.Content>
                    {this.props.show_modal === 'login' ? <LoginForm onSwitchToSignUp={this.onSwitchToSignUp}/>
                        : <SignUpForm onSwitchToSignIn={this.onSwitchToSignIn}/>}
                </Modal.Content>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {show_modal: state.userReducer.show_modal}
};

export default connect(mapStateToProps, null)(Login);
