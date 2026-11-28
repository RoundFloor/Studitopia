import { lazy, Suspense } from "react";
import { useSearchParams } from "react-router";
import "./BrowsePage.css"

export default function BrowsePage() {
    const [searchParam] = useSearchParams()
    const Page = (searchParam.has('id'))
        ? (searchParam.has('subject'))
            ? lazy(() => import('./subject/SubjectPage'))
            : (searchParam.has('area'))
                ? lazy(() => import('./area/AreaPage'))
                : lazy(() => import('./university/UniversityPage'))
        : lazy(() => import('./university/UniversityPage'))
    return <Suspense>
        <Page />
    </Suspense>
}