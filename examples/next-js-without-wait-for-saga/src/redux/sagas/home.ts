import { all, put, takeLatest, delay } from 'redux-saga/effects'
import {actions} from '../slices'

function* fetchHomePageDataSaga(_: ReturnType<typeof actions.home.fetchHomePageData>) {
  yield delay(1)
  yield all([
    put(actions.userInfo.fetchName()),
    put(actions.userInfo.fetchAge()),
  ])
}

export default function* homeSaga() {
  yield all([
    takeLatest(actions.home.fetchHomePageData.type, fetchHomePageDataSaga),
  ])
}
