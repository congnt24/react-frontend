import React, {Component} from 'react';
import {Image, Header, Form, Segment, Grid, Button, Message} from 'semantic-ui-react';
import {HttpClient} from "../../../utils/HttpClient";
import {STORAGE_KEY} from "../../../consts/Storage";
import {IS_LOGGED} from "../../redux/user/types";

class SignUpForm extends Component {
    state = {password: '', loading: false};
    handleChange = (e, {name, value}) => this.setState({[name]: value});
    handleSubmit = async () => {
        this.setState({loading: true});
        const {password, re_password, firstname, lastname, email} = this.state;
        try {
            let result = await HttpClient.post(`auth-service/user/create-user`,
                {username: email, password, re_password, firstname, lastname, email}).executeHttp();
            localStorage.setItem(STORAGE_KEY.USER, JSON.stringify(result.data));
            //Notify login success
            this.setState({loading: false});
            store.dispatch({type: IS_LOGGED});
        } catch (err) {
            console.error(err.stack);
            this.setState({loading: false});
        }
    };
    render() {
        let {onSwitchToSignIn} = this.props;
        return (
            <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Create your account
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input onChange={this.handleChange} name='firstname' required fluid icon='address card' iconPosition='left'
                                        placeholder='First name'/>
                            <Form.Input onChange={this.handleChange} name='lastname' required fluid icon='address card' iconPosition='left'
                                        placeholder='Last name'/>
                            <Form.Input onChange={this.handleChange} name='email' required fluid icon='user' iconPosition='left'
                                        placeholder='E-mail address'/>
                            <Form.Input
                                onChange={this.handleChange}
                                name='password'
                                required
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                            />
                            <Form.Input
                                onChange={this.handleChange}
                                name='re_password'
                                required
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Re-Password'
                                type='password'
                            />
                            <Button loading={this.state.loading} onClick={this.handleSubmit} color='teal' fluid size='large'>
                                Sign Up
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        You're already have an account? <Button onClick={onSwitchToSignIn}> Sign In</Button>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default SignUpForm;
