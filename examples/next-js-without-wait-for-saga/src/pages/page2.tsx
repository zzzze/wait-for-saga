import Link from 'next/link'

const Page2 = () => {
    return (
        <div>
            <Link href="/" passHref>
                <a>home</a>
            </Link>
            <div>page 2</div>
        </div>
    )
}

export default Page2
