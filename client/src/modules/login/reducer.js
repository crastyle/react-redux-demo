import actions from '../../event-definition'
import {handleAction, handleActions, combineActions} from 'redux-actions'
import {fromJS} from 'immutable'

export default {
    user: handleActions({
        [actions.login]: (state, action) => state.mergeDeep(action.payload),
    }, fromJS({
        isSuccess: true
    }))
}