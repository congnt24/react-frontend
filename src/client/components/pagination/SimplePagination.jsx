import React, { Component } from 'react';
import {Button} from 'semantic-ui-react';
import style from '../../assets/style.scss'
class SimplePagination extends Component {
  render() {
    return (
        <div className={style.flexContainer}>
            <Button.Group className={style.flexItem}>
                <Button labelPosition='left' icon='left chevron' content='Back' primary />
                <Button labelPosition='right' icon='right chevron' content='Next' primary />
            </Button.Group>
        </div>

    );
  }
}

export default SimplePagination;
