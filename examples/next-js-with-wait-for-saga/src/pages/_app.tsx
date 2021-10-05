import React, {FC} from 'react'
import {AppProps} from 'next/app'
import {wrapper} from '../redux/store'
import { Task } from 'redux-saga'

declare module 'redux' {
    interface Store<S = any, A extends Action = AnyAction> {
        sagaTask: Task
    }
}

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => {
    return (
        <Component {...pageProps} />
    )
}

export default wrapper.withRedux(WrappedApp)
