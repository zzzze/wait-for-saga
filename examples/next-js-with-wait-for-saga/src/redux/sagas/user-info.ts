import { all, put, takeLatest, delay } from 'redux-saga/effects'
import {withCallback} from 'wait-for-saga'
import {actions} from '../slices'

function* fetchNameSaga(_: ReturnType<typeof actions.userInfo.fetchName>) {
  yield delay(100)
  yield put(actions.userInfo.fetchNameSuccess('jack'))
}

function* fetchAgeSaga(_: ReturnType<typeof actions.userInfo.fetchAge>) {
  yield delay(100)
  yield put(actions.userInfo.fetchAgeSuccess(20))
}

export default function* userInfoSaga() {
  yield all([
    takeLatest(actions.userInfo.fetchName.type, withCallback(fetchNameSaga)),
    takeLatest(actions.userInfo.fetchAge.type, withCallback(fetchAgeSaga)),
  ])
}
