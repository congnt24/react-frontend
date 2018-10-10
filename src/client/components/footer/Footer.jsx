import React, {Component} from 'react';
import {Icon, Segment, Button, Label, Grid, Image} from 'semantic-ui-react';
import style from '../../assets/style.scss'

class Footer extends Component {
    render() {
        return (
            <Segment inverted color='blue'>
                <Grid columns={3} stackable>
                    <Grid.Column>
                        <p>Copy Right @ 2018</p>
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                    <Grid.Column>
                        <div className={style.flexContainer}>
                            <a href='https://www.facebook.com/' target="_blank"
                               className={[style.whiteIcon, style.flexItem].join(' ')}>
                                <Icon name='facebook' size='large'/> Facebook
                            </a>
                            <a href='https://www.google.com/' target="_blank"
                               className={[style.whiteIcon, style.flexItem].join(' ')}>
                                <Icon name='google' size='large'/> GooglePlus
                            </a>
                            <a href='https://twitter.com/' target="_blank"
                               className={[style.whiteIcon, style.flexItem].join(' ')}>
                                <Icon name='twitter' size='large'/> Twitter
                            </a>
                        </div>
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    }
}

export default Footer;
