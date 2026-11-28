import { useSearchParams } from 'react-router'
import './ForumPage.css'
import { lazy, Suspense } from 'react'

const PageMap = new Map([
    ['trending', lazy(() => import('./feed/FeedPage'))],
    ['browse', lazy(() => import('./browse/BrowsePage'))],
    ['library', lazy(() => import('./library/LibraryPage'))],
    ['post', lazy(() => import('./post/view/ViewPostPage'))]
])
function ForumPage() {
    const [searchParam] = useSearchParams()
    const Page = PageMap.get(searchParam.get('page') ?? 'trending') ?? PageMap.get('trending')!
    return <div className='main-content'>
            <Suspense>
                <Page/>
            </Suspense>
        </div>
}

export default ForumPage