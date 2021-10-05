import { Action, OnCompleteResult } from 'redux'
import { END, eventChannel, EventChannel, SagaIterator } from 'redux-saga'
import { all, call, CallEffect, delay, put, race, take } from 'redux-saga/effects'

const DEFAULT_TIMEOUT = 1000

function createCallbackChannel(action: Action): EventChannel<any> {
  const channel = eventChannel((emit: any) => {
    action.onComplete = (result) => {
      emit(result)
      emit(END)
    }
    return () => {
      return
    }
  })
  return channel
}

export function putWait(action: Action, timeout?: number): CallEffect {
  return call(function* (): SagaIterator {
    if (!timeout) {
      timeout = DEFAULT_TIMEOUT
    }
    const channel = yield call(createCallbackChannel, action)
    const { result, isTimeout }: { result: [OnCompleteResult]; isTimeout: boolean } = yield race({
      result: all([take(channel), put(action)]),
      isTimeout: delay(timeout),
    })
    if (isTimeout) {
      channel.close()
      return
    }
    const [{ error, cancelled, data }] = result
    if (error) {
      throw error
    }
    if (cancelled) {
      return
    }
    return data
  })
}
