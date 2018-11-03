import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Menu, Input, Responsive, Dropdown, Image, Header, Modal, Icon} from 'semantic-ui-react';
import Login from "../../pages/login/Login";
import {STORAGE_KEY} from "../../../consts/Storage";
import {connect} from "react-redux";
import {IS_LOGGED, SHOW_LOGIN, SHOW_SIGNUP} from "../../redux/user/types";
import style from "../../assets/style.scss";
import {withI18n} from "react-i18next";

class NavHeader extends Component {
    constructor(props) {
        super(props);
        store.dispatch({type: IS_LOGGED});
    }

    state = {};
    handleItemClick = (e, {name}) => this.setState({activeItem: name});
    onLogOut = (e, {name}) => {
        localStorage.removeItem(STORAGE_KEY.USER);
        store.dispatch({type: IS_LOGGED});
    };
    onLogin = (e, {name}) => {
        store.dispatch({type: SHOW_LOGIN});
    };
    onSignUp = (e, {name}) => {
        store.dispatch({type: SHOW_SIGNUP});
    };

    onChangeLanguage = (e, {value}) => {
        localStorage.setItem('i18nextLng', value);
        window.location.reload();
    };

    render() {
        const {activeItem} = this.state;
        let {t} = this.props;
        return (
            <Menu inverted color={'blue'}>
                <Login/>
                <Menu.Item header>
                    <Link to='/'>
                        <Icon name='facebook' size='large'/>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/about'>About</Link>
                </Menu.Item>
                {/*<Responsive*/}
                    {/*as={Menu.Menu}*/}
                    {/*position='right'*/}
                    {/*minWidth={Responsive.onlyMobile.maxWidth}>*/}
                    {/*/!*<Menu.Item*/}
                        {/*position='right'>*/}
                        {/*<Input*/}
                            {/*icon='search'*/}
                            {/*placeholder='Search...'/>*/}
                    {/*</Menu.Item>*!/*/}
                    {/*<Dropdown item text={t('language.change_language')}>*/}
                        {/*<Dropdown.Menu>*/}
                            {/*<Dropdown.Item value='en' onClick={this.onChangeLanguage}>{t('language.english')}</Dropdown.Item>*/}
                            {/*<Dropdown.Item value='vi' onClick={this.onChangeLanguage}>{t('language.vietnamese')}</Dropdown.Item>*/}
                        {/*</Dropdown.Menu>*/}
                    {/*</Dropdown>*/}
                    {/*{this.props.is_authenticated ? (*/}
                            {/*<Dropdown item text={`${this.props.user_data.lastname} ${this.props.user_data.firstname}`}>*/}
                                {/*<Dropdown.Menu>*/}
                                    {/*<Dropdown.Item onClick={this.onLogOut}>{t('user.logout')}</Dropdown.Item>*/}
                                {/*</Dropdown.Menu>*/}
                            {/*</Dropdown>)*/}
                        {/*: ([<Menu.Item key='signIn' content={t('user.login')} onClick={this.onLogin}/>,*/}
                            {/*<Menu.Item key='signUp' content={t('user.signup')} onClick={this.onSignUp}/>])}*/}

                {/*</Responsive>*/}

                {/*<Responsive*/}
                    {/*as={Menu.Menu}*/}
                    {/*position='right'*/}
                    {/*maxWidth={Responsive.onlyMobile.maxWidth}>*/}
                    {/*<Dropdown item simple text='Menu' direction='right'>*/}
                        {/*<Dropdown.Menu>*/}
                            {/*<Dropdown.Item text='Sign In'/>*/}
                            {/*<Dropdown.Item text='Sign Up'/>*/}
                        {/*</Dropdown.Menu>*/}
                    {/*</Dropdown>*/}
                {/*</Responsive>*/}

            </Menu>
        );
    }
}

/*<Menu.Item
                                name='logOut'
                                onClick={this.onLogOut}>
                            </Menu.Item>*/

const mapStateToProps = (state, ownProps) => {
    return {...state.userReducer}
};
export default withI18n()(connect(mapStateToProps, null)(NavHeader));