import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

/* eslint-disable react/no-danger */

class Html extends React.Component {
    static propTypes = {
        helmet: PropTypes.object,
        // description: PropTypes.string,
        // styles: PropTypes.arrayOf(
        //   PropTypes.shape({
        //     id: PropTypes.string.isRequired,
        //     cssText: PropTypes.string.isRequired,
        //   }).isRequired,
        // ),
        styles: PropTypes.arrayOf(PropTypes.string.isRequired),
        scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
        app: PropTypes.object, // eslint-disable-line
        children: PropTypes.string.isRequired,
        initial_state: PropTypes.object
    };

    static defaultProps = {
        styles: [],
        scripts: [],
    };

    render() {
        const {helmet, styles, scripts, app, children, redux_initial_state, initial_state} = this.props;
        return (
            <html className="no-js" lang="en">
            <head>
                <meta charSet="utf-8"/>
                <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
                {helmet.title.toComponent()}
                {helmet.base.toComponent()}
                {helmet.meta.toComponent()}
                {helmet.link.toComponent()}
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"/>
                <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                {scripts.map(script => (<link key={script} rel="preload" href={script} as="script"/>))}
                {styles.map(style => (<link key={style} rel="stylesheet" href={style}/>))}
            </head>
            <body>
            <div id="root" dangerouslySetInnerHTML={{__html: children}}/>
            <script dangerouslySetInnerHTML={{__html: `window.__REDUX_INITIAL_STATE__= ${serialize(redux_initial_state)}`}}/>
            {scripts.map(script => <script charSet="utf-8" key={script} src={script}/>)}
            </body>
            </html>
        );
    }
}

export default Html;
