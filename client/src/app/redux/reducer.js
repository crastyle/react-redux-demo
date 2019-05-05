import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutablejs';
import {
  setToImmutableStateFunc,
  setToMutableStateFunc,
  immutableReducer as reduxAsyncConnect
} from 'redux-connect';
import routeReducer from './routing';
import { wireReducersInModules } from './util';

setToImmutableStateFunc(mutableState => fromJS(mutableState));
setToMutableStateFunc(immutableState => immutableState.toJS());

export default function createReducer(context) {
  let reducers = wireReducersInModules()
  context.reducers = reducers
  return combineReducers({
    reduxAsyncConnect,
    routing: routeReducer,
    ...reducers
  });
}

