import { all, call } from 'redux-saga/effects'
import homeSaga from './home'
import userInfoSaga from './user-info'

function* rootSaga() {
  yield all([
    call(homeSaga),
    call(userInfoSaga),
  ])
}

export default rootSaga
