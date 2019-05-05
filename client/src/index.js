import React from 'react';
import { fromJS } from 'immutable';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { match, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './root';
import getRoutes from './app/routes';
import configureStore from './app/redux/store';
import createSelectLocationState from './app/utils/createSelectLocationState';
import events from './event-definition';
import framework from './framework'
import Auth from './framework/Auth'
import bootstrap from './bootstrap'
import './styles/common.scss';
import '!style-loader!css-loader!./styles/antd.css'

const context = { events, $: { actions: framework.actions } };
export default {
    context
}
export {
    context
}
const initialState = fromJS(window.__INITIAL_STATE__);
const store = configureStore(context, browserHistory, initialState);
context.store = store;
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: createSelectLocationState('routing')
})

const auth = Auth.getInstance(store, history)
context.$.auth = auth


const renderApp = renderProps => {
    if (!document.getElementById('root')) {
        const root = document.createElement('div')
        root.setAttribute('id', 'root')
        document.body.appendChild(root)
    }
    return render(
        <AppContainer>
            <Root {...{ store, history, ...renderProps, context }} />
        </AppContainer>,
        document.getElementById('root')
    )
}

match(
    { history, routes: getRoutes() },
    (error, redirectLocation, renderProps) => renderApp(renderProps)
)

if (module.hot) {
    module.hot.accept('./app/routes', () => {
        const nextRoutes = require('./app/routes').default || require('./app/routes');
        renderApp({ routes: nextRoutes() });
    });
}