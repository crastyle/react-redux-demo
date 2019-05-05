import {createAction, createActions} from 'redux-actions'
import actions from '../../event-definition'
import {context} from '../..'
import {fromJS} from 'immutable'
import {outputs} from 'isocall';
import { push, replace } from 'react-router-redux'
import qs from 'query-string'
const querystring = qs.parse(location.search)

const createActionAsync = context.$.actions.createActionAsync

export default {
    [actions.login]: createActionAsync(actions.login, async ({dispatch, getState, resolve}, user) => {
        console.log(user)
        return fromJS({
            code: '200',
            message: 'incorrect password or account',
            isSuccess: false
        })
    })
}
