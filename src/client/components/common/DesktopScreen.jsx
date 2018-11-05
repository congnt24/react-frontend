import React, { Component } from 'react';
import Responsive from "./Responsive";

class DesktopScreen extends Component {
  render() {
    return (
        <Responsive {...this.props} minWidth={Responsive.onlyComputer.minWidth}>
            {this.props.children}
        </Responsive>
    );
  }
}

export default DesktopScreen;
