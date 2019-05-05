import React from 'react';
import { loadOnServer } from 'redux-connect';
import { renderToString } from 'react-dom/server';
import { syncHistoryWithStore } from 'react-router-redux';
import { createMemoryHistory, match } from 'react-router';
import Html from '../html';
const hook = require('css-modules-require-hook');
// todo does not work!
hook({
  generateScopedName: '[hash:8]',
});
import routes from '../../../client/src/app/routes';
import configureStore from '../../../client/src/app/redux/store';
import createSelectLocationState from '../../../client/src/app/utils/createSelectLocationState';

export default function createSSR(assets) {
  return ctx => {
    const memoryHistory = createMemoryHistory(ctx.url);
    const store = configureStore(memoryHistory);
    const history = syncHistoryWithStore(memoryHistory, store, {
      selectLocationState: createSelectLocationState('routing')
    });

    match({ history, routes: routes(), location: ctx.url },
      (err, redirectLocation, renderProps) => {
        if (err) {
          ctx.status = 500
          ctx.body = err.message
        } else if (redirectLocation) {
          ctx.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
          loadOnServer({ ...renderProps, store }).then(() => {
            const content = renderToString(<Html {...{ renderProps, store, assets }} />);
            ctx.body = `<!doctype html>\n${content}`
          });
        } else {
          ctx.status = 404
          ctx.body = 'Not found';
        }
      });
  };
}