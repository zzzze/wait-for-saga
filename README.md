# Wait For Saga

Some toolkits to make sure you can wait for saga to complete and get result from saga.

In some situation, such as `Next.js`, you will need to wait for saga to stop. Otherwise, page renderer may render page which empty data.
There are some some workarounds to do this, such as use a `setTimeout` to make sure that saga is already completed and data in redux is correct.
But now, you can use `wait-for-saga` to avoid using `setTimeout`. It will speed up the response of page renderer,
and make sure the renderer render page using correct data.

## Maybe you don't need this plugin!

If you are not in the following situation, you don't need this plugin, as you don't care when the saga is finished and stoped.

1. Using `redux-saga` in SSR, and page renderer denpends on `redux-saga`.

2. Acquiring result data of saga.

## Install

### Using npm

`npm install wait-for-saga --save`

### Using yarn

`yarn add wait-for-saga`

## APIs

* `function withCallback<T extends (...args: any[]): any>(saga: T)`

    All sagas which is be waited, must be wrappered by `withCallback`. e.g.

    ```javascript
    function* anySaga(action) {
        // ...
        return 'success'
    }
    takeLatest('ANY-ACTION', withCallback(anySaga))
    ```

* `function putWait(action: Action, timeout?: number): CallEffect`

    `putWait` is similar to `put` which provided by `redux-saga`.
    The difference is it returns a promise resolved with saga result instead of return action object. e.g.

    ```javascript
    function* anotherSaga(action) {
        const res = yield put({type: 'ANY-ACTION'})
        console.log(res) // res == 'sucess'
    }
    ```

* `function dispatch<T extends Action & {wait: true}, P = any>(action: T): Promise<P>`

    If using `waitForSagaMiddleware`, the `dispatch` api will be extended, it can not only be used as before,
    but also can be used to acquiring result of saga, just like `putWait`. e.g.

    ```typescript
    // apply middleware to store
    import {middleware as waitForSagaMiddleware} from 'wait-for-saga'
    const store = configureStore({
      // ...
      middleware: [sagaMiddleware, waitForSagaMiddleware],
    })
    // ...
    ```

    ```typescript
    function createAction() {
        return {
            type: 'ANY-ACTION',
        }
    }
    const res1 = dispatch(createAction())
    const res2 = await dispatch({
        ...createAction(),
        wait: true as const, // if not using typescript, `as const` should be omitted.
    })
    console.log(res1) // res1 == '{"type": "ANY-ACTION"}'
    console.log(res2) // res2 == 'success'
    ```

## SSR

```typescript
import {NextPageContext} from "next"
import {actions} from "../redux/slices"
import {useAppSelector, wrapper} from "../redux/store"
import { END } from 'redux-saga'
import Link from 'next/link'

const Home = () => {
    const name = useAppSelector(state => state.userInfo.name)
    const age = useAppSelector(state => state.userInfo.age)
    return (
        <div>
            <Link href="/page2" passHref>
                <a>page 2</a>
            </Link>
            <div>name: {name}</div>
            <div>age: {age}</div>
        </div>
    )
}

Home.getInitialProps = wrapper.getInitialPageProps(store => async (_: NextPageContext) => {
    const action = {
        ...actions.home.fetchHomePageData(),
        wait: true as const,
    }
    const res = await store.dispatch(action)
    console.log(res) // res == 'success'
    if (!process.browser) {
        store.dispatch(END)
        await store.sagaTask.toPromise()
    }
})

export default Home
```

See `examples` folder for more details.
