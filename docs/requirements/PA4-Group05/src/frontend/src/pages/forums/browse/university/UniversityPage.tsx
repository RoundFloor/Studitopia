import Button from "../../../../shared/ui/button";
import "./UniversityPage.css";
import hide from "@assets/icon/hide.svg";
import { useNavigate } from "react-router";

import LoadingPage from "../../../loading/LoadingPage";
import { useAccount } from "@/features/account/me/account";
import { useTag } from "@/features/forum/tag/tag";

const formatter = new Intl.NumberFormat('en', { notation: 'compact' });

function TrendingBox(data: { popularity?: number, major?: string, title: string, upvote?: number, downvote?: number, comment?: number }) {
    return <Button className="trending" variant="secondary">
        <div className="title-box">
            {
                (data.popularity === undefined || data.popularity >= 0)?
                <div className="popularity false">
                        {(data.popularity === undefined || data.popularity == 0) ? "a second ago" : `${(data.popularity >= 60) ? `${data.popularity / 60}h ` : ""}${data.popularity % 60}m`
                    }
                    </div>
                    : undefined
            }
            <div className="major">
                {
                    (data.popularity==-1)?
                        <div className={"popularity true"}>HOT</div> : undefined
                }
                <h4>{(data.major === undefined) ? "COMMON" : data.major}</h4>
            </div>
        </div>
        <h3 className="title">{data.title}</h3>
        <div className="interaction-box">
            <h5>↑ {data.upvote ?? 0} UPVOTES</h5>
            <h5>↓ {data.downvote ?? 0} DOWNVOTES</h5>
            <h5>↳ {data.comment ?? 0} COMMENT</h5>
        </div>
    </Button>
}

function Major(data: { major: string, sub: number, post: number, icon: string, index: number, onClick: (() => void)}) {
    return <Button className={`major C${data.index%4}`} onClick={data.onClick}>
        <h4 className="title">{data.major}</h4>
        <div className="description">
            <h6 className="subject">{formatter.format(data.sub).toLowerCase()} SUBJECTS</h6>
            <h6 className="post">{formatter.format(data.post).toLowerCase()} POSTS</h6>
        </div>
        <div className="more">↗</div>
        <div>{data.icon}</div>
    </Button>
}
function YourMajor(data: { major: string, sub: number, icon: string, index: number }) {
    return <div className="yourmajor">
        <div className="icon"></div>
        <h4 className="major">{data.major}</h4>
        <h5 className="sub">{formatter.format(data.sub).toLowerCase()} subject{(data.sub != 1) ? "s" : ""}</h5>
    </div>
}

function Activity(data: { title: string, view: number, upvote: number, downvote: number, comment: number, index: number }) {
    return <Button className="activity" variant={data.index % 2 ? "secondary" : "primary"}>
        <h4 className="title">{data.title}</h4>
        <h5 className="view">
            {formatter.format(data.view).toLowerCase()}<img src={hide} />
        </h5>
        <div className="vote-group">
            <h5 className="upvote">↑{formatter.format(data.upvote).toLowerCase()} UPVOTES</h5>
            <h5 className="downvote">↓{formatter.format(data.downvote).toLowerCase()} DOWNVOTES</h5>
        </div>
    </Button>
}


export default function BrowserPage() {

    const { data: user, isLoading: isUserLoading } = useAccount()
    const { data: areas, isLoading: isAreaLoading } = useTag(user?.university_id ?? "", "university")
    const navigate = useNavigate()

    const isFetching = isUserLoading || isAreaLoading;

    if (isFetching) return <LoadingPage/>

    return <div className='university-page'>
        <div className="content-box">
            <div className="trending-box">
                <h3>TRENDING NOW</h3>
                <div className="trending-list">
                    <div className="overflow">
                        <TrendingBox title="Why does Dijkstra fail with negative edges?"></TrendingBox>
                        <TrendingBox popularity={-1} title="How I remember every stage of mitosis"></TrendingBox>
                        <TrendingBox title="Why does Dijkstra fail with negative edges?"></TrendingBox>
                        <TrendingBox popularity={-1} title="How I remember every stage of mitosis"></TrendingBox>
                        <TrendingBox title="Why does Dijkstra fail with negative edges?"></TrendingBox>
                        <TrendingBox popularity={-1} title="How I remember every stage of mitosis"></TrendingBox>
                    </div>
                </div>
            </div>
            <div className="university-box">
                <div className="title">
                    <h3 >BROWSE BY AREA</h3>
                    <h5># COMMUNITIES</h5>
                </div>
                <div className="selection-box">
                    {
                        areas?.map((value, index) =>
                            <Major key={value.id} major={value.name} post={value.num_post} sub={value.num_tag} icon="" index={index} onClick={() => {
                                navigate(`/forum?page=browse&page=area&area=${value.name}&id=${value.id}`)                               
                            }}></Major>
                        )
                    }
                </div>
                <div className="side-panel">
                    <Button className="yourmajors" variant="secondary">
                        <h3>YOUR MAJORS</h3>
                        <div className="major-list">
                            <YourMajor icon="" major="Computer Science" sub={12} index={0} />
                            <YourMajor icon="" major="Computer Science" sub={12} index={0} />
                            <YourMajor icon="" major="Computer Science" sub={12} index={0} />
                        </div>
                    </Button>
                    <div className="recent-activity">
                        <h3>RECENT ACTIVITIES</h3>
                        <div className="activities-list">
                            <div className="overflow">
                                <Activity title="Test" view={3000} upvote={3000} downvote={3000} comment={3000} index={0}/>
                                <Activity title="Test" view={3000} upvote={3000} downvote={3000} comment={3000} index={1}/>
                                <Activity title="Test" view={3000} upvote={3000} downvote={3000} comment={3000} index={0}/>
                                <Activity title="Test" view={3000} upvote={3000} downvote={3000} comment={3000} index={1}/>
                            </div>
                        </div>
                        <h4 className="show-more">Show more</h4>
                    </div>

                </div>
            </div>
        </div>
    </div>
}