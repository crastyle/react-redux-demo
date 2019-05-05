import actions from './action'
import { handleAction, handleActions, combineActions } from 'redux-actions'

export const myReducer2 = handleAction(actions.addTodo2, (state, action) => ({
  xx: state.xx + action.payload
}), { xx: 200 })