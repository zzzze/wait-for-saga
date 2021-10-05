declare module 'redux' {
  export interface OnCompleteResult {
    error?: any
    cancelled?: boolean
    data?: any
  }

  interface Action<T = any> {
    wait?: boolean
    onComplete?: (result: OnCompleteResult) => void
  }

  type DispatchReturnType<T, P> = T extends { wait: true } ? Promise<P> : T

  interface Dispatch<A extends Action = AnyAction> {
    <T extends A, P = any>(action: T): DispatchReturnType<T, P>
  }
}

export { putWait } from './saga-put-wait'
export { withCallback } from './saga-with-callback'
export { default as middleware } from './middleware'
