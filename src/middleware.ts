import { Dispatch, Action, OnCompleteResult } from 'redux'

const waitForSagaResultMiddleware = () => (next: Dispatch) => (action: Action) => {
  if (!action.wait) {
    return next(action)
  }
  const p = new Promise((resolve, reject) => {
    action.onComplete = (result: OnCompleteResult) => {
      const { error, cancelled, data } = result
      if (error) {
        reject(error)
      }
      if (cancelled) {
        resolve(null)
      }
      resolve(data)
    }
  })
  next(action)
  return p
}

export default waitForSagaResultMiddleware
