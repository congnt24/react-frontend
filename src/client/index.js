require('../utils/prototype');
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./containers/App";
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux';
import configureStore from './redux/configureStore';
import rootSaga from "./redux/rootSagas";
// import queryString from 'query-string';
require('../localization');
const initialData = window.__INITIAL_STATE__ || {};
let store = configureStore(initialData);
console.log(initialData, 'initialData');
import history from "../commons/history";
store.runSaga(rootSaga);
global['store'] = store;

//Đây là entry point của webpack -> webpack sẽ compile từ file này dựa trên file html_template
//Để sử dụng hot loader, ta bọc component app bởi AppContainer. Khi nào code thay đổi, ta sẽ render lại APP
let context ={};
const container = document.getElementById('root');
let currentLocation = history.location;
let appInstance;

const scrollPositionsHistory = {};
// Re-render the app when window.location changes
async function onLocationChange(location, action) {
    console.log(location, 'location');
    console.log(action, 'action');
    
    // Remember the latest scroll position for the previous location
    scrollPositionsHistory[currentLocation.key] = {
        scrollX: window.pageXOffset,
        scrollY: window.pageYOffset,
    };
    // Delete stored scroll position for next page if any
    if (action === 'PUSH') {
        delete scrollPositionsHistory[location.key];
    }
    currentLocation = location;

    const isInitialRender = !action;
    global.isServer = isInitialRender;
    console.log(isInitialRender, 'isInitialRender');
    
    try {
        context.pathname = location.pathname;
        // context.query = queryString.parse(location.search);

        // Traverses the list of routes in the order they are defined until
        // it finds the first route that matches provided URL path string
        // and whose action method returns anything other than `undefined`.
        // const route = await router.resolve(context);
        //
        // // Prevent multiple page renders during the routing process
        // if (currentLocation.key !== location.key) {
        //     return;
        // }
        //
        // if (route.redirect) {
        //     history.replace(route.redirect);
        //     return;
        // }

        const renderReactApp = isInitialRender ? ReactDOM.hydrate : ReactDOM.render;
        appInstance = renderReactApp(
            <Provider store={store} context={context}>
                <AppContainer>
                    <App/>
                </AppContainer>
            </Provider>,
            container,
            () => {
                if (isInitialRender) {
                    // Switch off the native scroll restoration behavior and handle it manually
                    // https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
                    if (window.history && 'scrollRestoration' in window.history) {
                        window.history.scrollRestoration = 'manual';
                    }

                    const elem = document.getElementById('css');
                    if (elem) elem.parentNode.removeChild(elem);
                    return;
                }

                // document.title = route.title;
                //
                // updateMeta('description', route.description);
                // Update necessary tags in <head> at runtime here, ie:
                // updateMeta('keywords', route.keywords);
                // updateCustomMeta('og:url', route.canonicalUrl);
                // updateCustomMeta('og:image', route.imageUrl);
                // updateLink('canonical', route.canonicalUrl);
                // etc.

                let scrollX = 0;
                let scrollY = 0;
                const pos = scrollPositionsHistory[location.key];
                if (pos) {
                    scrollX = pos.scrollX;
                    scrollY = pos.scrollY;
                } else {
                    const targetHash = location.hash.substr(1);
                    if (targetHash) {
                        const target = document.getElementById(targetHash);
                        if (target) {
                            scrollY = window.pageYOffset + target.getBoundingClientRect().top;
                        }
                    }
                }

                // Restore the scroll position if it was saved into the state
                // or scroll to the given #hash anchor
                // or scroll to top of the page
                window.scrollTo(scrollX, scrollY);

                // Google Analytics tracking. Don't send 'pageview' event after
                // the initial rendering, as it was already sent
                // if (window.ga) {
                //     window.ga('send', 'pageview', createPath(location));
                // }
            },
        );
    } catch (error) {
        console.error(error);

        // Do a full page reload if error occurs during client-side navigation
        if (!isInitialRender && currentLocation.key === location.key) {
            console.error('RSK will reload your page after error');
            window.location.reload();
        }
    }
}

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/mjackson/history#readme
history.listen(onLocationChange);
onLocationChange(currentLocation);


let renderMethod = /*!!module.hot ? ReactDOM.render :*/ ReactDOM.hydrate;
let render = (Component) => renderMethod(
    <Provider store={store}>
        <AppContainer>
            <Component/>
        </AppContainer>
    </Provider>
    , container);

// render(App);
// Webpack Hot Module Replacement API
// module.hot.accept('./containers/App', () => render(require('./containers/App').default));