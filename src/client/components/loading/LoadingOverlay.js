import React  from 'react'
import styled  from 'styled-components'
import {PulseLoader} from 'halogenium';

class LoadingOverlayWrapper extends React.Component {
    render () {
        const {
            active,
        } = this.props

        let loadNode = active && <LoadingOverlay key='the_dimmer' {...this.props} />
        let styles = {
            position: 'relative',
            ...this.props.style
        };
        return (
            <div
                className={this.props.className}
                style={styles}>
                {loadNode}
                {this.props.children}
            </div>
        )
    }
}

LoadingOverlayWrapper.defaultProps = {
    active: false,
    className: '_loading-overlay',
    background: 'rgba(0, 0, 0, 0.7)',
    spinnerSize: '50px',
    color: '#FFF',
    zIndex: 800,
    animate: false,
    style: {}
}

const Overlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  background: ${props => props.background};
  color: ${props => props.color};
  transition: opacity ${props => props.speed}ms ease-out;
  display: flex;
  text-align: center;
  font-size: 1.2em;
  z-index: ${props => props.zIndex};
  &._loading-overlay-transition-appear,
  &._loading-overlay-transition-enter {
    opacity: 0.01;
  }
  &._loading-overlay-transition-appear._loading-overlay-transition-appear-active,
  &._loading-overlay-transition-enter._loading-overlay-transition-enter-active {
    opacity: 1;
    transition: opacity .5s ease-in;
  }
  &._loading-overlay-transition-leave {
    opacity: 1;
  }
  &._loading-overlay-transition-leave._loading-overlay-transition-leave-active {
    opacity: 0;
    transition: opacity .5s ease-in;
  }
`
const Content = styled.div`
  margin: auto;
`;

class LoadingOverlay extends React.Component {
    render () {
        let spinnerNode = null;
        if (this.props.spinner) {
            spinnerNode = (
                <PulseLoader color="#26A65B" size="16px" margin="4px"/>
            )
        }

        let textNode = null;
        if (this.props.text) textNode = <div>{this.props.text}</div>;

        let contentNode = null;
        if (this.props.text || this.props.spinner) {
            contentNode = (
                <Content>
                    {spinnerNode}
                    {textNode}
                </Content>
            )
        }

        return (
            <Overlay
                background={this.props.background}
                color={this.props.color}
                speed={this.props.speed}
                zIndex={this.props.zIndex}
                key='dimmer'
                onClick={this.props.onClick}>
                {contentNode}
            </Overlay>
        )
    }
}

LoadingOverlay.defaultProps = {
    text: null,
    spinner: false,
    onClick: null
};

export default LoadingOverlayWrapper
