import { wireActionsInModules } from './util'
import { fork } from 'redux-saga/effects'

export default function createAction(context) {
  const actions = wireActionsInModules()
  context.actions = actions
  return actions
}