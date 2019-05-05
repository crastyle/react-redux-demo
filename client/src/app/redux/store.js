import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { fromJS } from 'immutable';
import customMiddlewares from './middlewares';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware, { END } from 'redux-saga'
import createReducer from './reducer';
import createSaga from './saga';
import createAction from './action';

export default function configureStore(context, history, initialState = {}) {
  const reducer = createReducer(context);
  const saga = createSaga(context);
  const actions = createAction(context);
  const sagaMiddleware = createSagaMiddleware(saga);
  const middlewares = [
    thunkMiddleware,
    promiseMiddleware,
    sagaMiddleware,
    ...customMiddlewares,
    routerMiddleware(history)
  ];

  const composeEnhancers =
    (global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })) || compose;

  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
  );

  let store = createStore(
    reducer,
    fromJS(initialState),
    enhancer
  );

  store.getInstance = () => {
    return  createStore(
      reducer,
      fromJS(initialState),
      enhancer
    );
  }
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  store.runSaga(saga)
  
  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const createNextReducer = require('./reducer').default;
      const nextReducer = createNextReducer();

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}