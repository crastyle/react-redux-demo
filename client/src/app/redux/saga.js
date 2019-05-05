import { wireSagasInModules } from './util'
import { fork } from 'redux-saga/effects'

export default function createSaga(context) {
  const sagas = wireSagasInModules()
  context.sagas = sagas
  const rootSaga = function*(){
    for (let i=0, len=sagas.length; i<len; i++) {
      yield fork(sagas[i])
    }
  }
  return rootSaga
}