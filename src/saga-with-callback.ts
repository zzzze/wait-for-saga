import { Action, OnCompleteResult } from 'redux'
import { SagaIterator } from 'redux-saga'
import { call, cancelled } from 'redux-saga/effects'

function onComplete(action: Action, result: OnCompleteResult) {
  const fn = action.onComplete
  if (fn) {
    fn(result)
  }
}

export function withCallback<T extends (...args: any[]) => any>(saga: T) {
  return function* (...args: Parameters<typeof saga>): SagaIterator {
    let error = undefined
    let data = undefined
    const action = args[0]
    try {
      data = yield call(saga, ...args)
    } catch (err) {
      error = err
    } finally {
      if (yield cancelled()) {
        return onComplete(action, { cancelled: true })
      }
    }
    onComplete(action, {
      error,
      data,
    })
  }
}
