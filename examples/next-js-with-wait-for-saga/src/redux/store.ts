import { createWrapper } from 'next-redux-wrapper'
import { configureStore } from '@reduxjs/toolkit'
import { createDispatchHook, createSelectorHook } from 'react-redux'
import { Store } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {rootReducer} from './slices'
import rootSaga from './sagas'
import {middleware as waitForSagaMiddleware} from 'wait-for-saga'

const isDEV = process.env.NODE_ENV !== 'production'

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware, waitForSagaMiddleware],
    devTools: isDEV,
  })
  ;(store as Store).sagaTask = sagaMiddleware.run(rootSaga)
  return store
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = createDispatchHook<RootState>()
export const useAppSelector = createSelectorHook<RootState>()

export const wrapper = createWrapper(makeStore as () => Store, { debug: /* isDEV */ false })
