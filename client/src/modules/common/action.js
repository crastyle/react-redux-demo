import {createAction, createActions} from 'redux-actions'
import actions from '../../event-definition'
import {context} from '../..'
import {fromJS} from 'immutable'
import {outputs} from 'isocall';
import { push, replace } from 'react-router-redux'
import qs from 'query-string'
import { getCart, addCart } from '../../api'
const querystring = qs.parse(location.search)

const createActionAsync = context.$.actions.createActionAsync

export default {
    
    [actions.getCart]: createActionAsync(actions.getCart, async ({dispatch, getState, resolve}) => {
        const { status, rows } = await getCart()
        if (status == 0) {
            return fromJS(rows)
        }
    }),
    [actions.addCart]: createActionAsync(actions.addCart, async ({dispatch, getState, resolve}, ProNo, ProId) => {
        const data = [{ProNo, ProId, Num: 1}]
        const { status, Message } = await addCart(JSON.stringify(data))
        return { status, Message }
    }),
    [actions.loginFromStorage]: createActionAsync(actions.loginFromStorage, async ({dispatch, getState, resolve}) => {
        const usertoken = localStorage.getItem('user') || '{}'
        await dispatch({
            type: actions.loginFromStorage,
            payload: fromJS(JSON.parse(usertoken))
        })
    })
}
