import actions from '../../event-definition'
import {handleAction, handleActions, combineActions} from 'redux-actions'
import {fromJS, List} from 'immutable'
const initUser = fromJS({
    _id: null,
    loginToken: ''
});
export default {
    carts: handleActions({
        [actions.getCart]: (state, action) => state.mergeDeep(action.payload),
    }, List([])),
    userToken: handleActions({
        [actions.loginFromStorage]: (state, action) => action.payload
    }, fromJS({
        clientno: '',
        clientname: '',
        clientid: ''
    }))
}