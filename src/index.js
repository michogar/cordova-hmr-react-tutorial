/**
 * Created by michogarcia on 13/06/17.
 */

import { AppContainer } from 'react-hot-loader'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

require('onsenui/css/onsen-css-components.css');
require('onsenui/css/onsenui.css');

const rootElement = document.getElementById('app');
const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        rootElement
    )
}

render(App)

if (module.hot) {
    module.hot.accept('./App', () => { render(App) })
}