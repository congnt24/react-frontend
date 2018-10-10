import React, {Component} from 'react';
import {Image, Header, Form, Segment, Grid, Button, Message} from 'semantic-ui-react';
import {HttpClient} from "../../../utils/HttpClient";
import {STORAGE_KEY} from "../../../consts/Storage";
import {IS_LOGGED} from "../../redux/user/types";

class LoginForm extends Component {
    state = {username: '', password: '', loading: false};
    handleChange = (e, {name, value}) => this.setState({[name]: value});
    handleSubmit = async () => {
        this.setState({loading: true});
        const {username, password} = this.state;
        try {
            let result = await HttpClient.post(`auth-service/user/login`, {username, password}).executeHttp();
            localStorage.setItem(STORAGE_KEY.USER, JSON.stringify(result.data));
            //Notify login success
            this.setState({loading: false});
            store.dispatch({type: IS_LOGGED});
        } catch (err) {
            this.setState({loading: false});
            console.error(err.stack);
        }
    };

    render() {
        let {onSwitchToSignUp, onSubmit} = this.props;
        return (
            <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Log-in to your account
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input
                                name='username'
                                required
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='E-mail address'
                                onChange={this.handleChange}/>
                            <Form.Input
                                name='password'
                                required
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                onChange={this.handleChange}
                            />
                            <Button loading={this.state.loading} color='teal' fluid size='large'
                                    onClick={this.handleSubmit}>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <Button onClick={onSwitchToSignUp}>Sign Up</Button>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default LoginForm;
