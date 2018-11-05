import React, { Component } from 'react';
import Responsive from "./Responsive";

class MobileScreen extends Component {
  render() {
    return (
        <Responsive {...this.props} maxWidth={Responsive.onlyTablet.maxWidth}>
            {this.props.children}
        </Responsive>
    );
  }
}

export default MobileScreen;
