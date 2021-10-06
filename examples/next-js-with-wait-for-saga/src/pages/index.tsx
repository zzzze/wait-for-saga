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
