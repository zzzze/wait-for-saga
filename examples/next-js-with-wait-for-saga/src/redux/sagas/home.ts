import { all, takeLatest, delay } from 'redux-saga/effects'
import {putWait, withCallback} from 'wait-for-saga'
import {actions} from '../slices'

function* fetchHomePageDataSaga(_: ReturnType<typeof actions.home.fetchHomePageData>) {
  yield delay(1)
  yield all([
    putWait(actions.userInfo.fetchName()),
    putWait(actions.userInfo.fetchAge()),
  ])
  return 'success'
}

export default function* homeSaga() {
  yield all([
    takeLatest(actions.home.fetchHomePageData.type, withCallback(fetchHomePageDataSaga)),
  ])
}
