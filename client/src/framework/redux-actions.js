import {createAction as ca, createActions, handleAction, handleActions} from 'redux-actions'
import {Map} from 'immutable'
const util = {
    isPromise: o => {
        return o.then && typeof o.then === 'function'
    },
    isObject: o => {
        return typeof o === 'object'
    }
};

export default {
    createAction: (...args) => {
        return ca.apply(null, args)
    },

    createActionAsync: (...args) => {
        let type = args[0]
        let thunk = args[1]
        return async (...args) => async (dispatch, getState) => {
            let res = null
            let resolved = null
            try {
                const resolve = payload => {
                    resolved = payload
                }
                res = await thunk({dispatch, getState, resolve}, ...args)
            } catch (e) {
                e.error = true
                dispatch({type, payload: Map({message: e.message, e: true}), error: true});
                throw e
            }
            let payload = resolved ? resolved : res;
            if (payload && util.isObject(payload) && JSON.stringify(payload) !== '{}' && payload.get && payload.get('e') && payload.get('message')) {
                return dispatch({ type, payload, error: true })
            }
            if (payload) {
                dispatch({type, payload})
            }
            return res
        }
    },

    handleAction: (...args) => {
        return handleAction.apply(null, args)
    },

    handleActions: (...args) => {
        return handleActions.apply(null, args)
    }
}